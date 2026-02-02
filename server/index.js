import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
// Load environment variables
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: [
    'https://meanx.ai',
    'https://www.meanx.ai',
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cors(corsOptions));

app.options('*', cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});
app.use(limiter);

// Stricter rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact submissions per hour
  message: {
    success: false,
    message: 'Too many contact submissions, please try again later.',
  },
});

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Email transporter configuration
const createTransporter = () => {
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Development fallback (Ethereal)
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS,
    },
  });
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Contact form submission endpoint
app.post(
  '/api/contact',
  contactLimiter,
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('company')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Company name must be less than 100 characters'),
    body('message')
      .trim()
      .isLength({ min: 10, max: 5000 })
      .withMessage('Message must be between 10 and 5000 characters'),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const { name, email, company, message } = req.body;

      // Create email transporter
      const transporter = createTransporter();

      // Verify transporter connection
      await transporter.verify();

      // Prepare email content
      const mailOptions = {
  from: `"Meanx AI Contact" <contact@meanx.ai>`,
  to: process.env.CONTACT_EMAIL || 'contact@meanx.ai',
  replyTo: email,
  subject: `New Contact Form Submission from ${name}`,
  text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}
  `,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .field { margin-bottom: 20px; }
    .field-label { font-weight: bold; color: #6366f1; margin-bottom: 5px; }
    .field-value { color: #374151; }
    .message-box { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value">${email}</div>
      </div>
      <div class="field">
        <div class="field-label">Company</div>
        <div class="field-value">${company || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  </div>
</body>
</html>
        `,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);

      console.log('Email sent:', info.messageId);

      // For development, log the preview URL
      if (process.env.NODE_ENV !== 'production' && info.ethereal) {
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }

      res.status(200).json({
        success: true,
        message: 'Thank you for your message. We will get back to you within 24 hours.',
        data: {
          messageId: info.messageId,
          previewUrl: info.ethereal ? nodemailer.getTestMessageUrl(info) : undefined,
        },
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    }
  }
);

// Newsletter signup endpoint
app.post(
  '/api/newsletter',
  rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: {
      success: false,
      message: 'Too many newsletter signups, please try again later.',
    },
  }),
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const { email } = req.body;

      // Here you would typically:
      // 1. Add email to your newsletter service (Mailchimp, SendGrid, etc.)
      // 2. Store in database
      // For now, we'll just log it

      console.log('Newsletter signup:', email);

      res.status(200).json({
        success: true,
        message: 'Successfully subscribed to our newsletter!',
      });
    } catch (error) {
      console.error('Newsletter signup error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to subscribe. Please try again later.',
      });
    }
  }
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   meanx.ai Server                                      ║
║   Running on port ${PORT}                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                           ║
║                                                        ║
║   Endpoints:                                           ║
║   - GET  /api/health          Health check             ║
║   - POST /api/contact         Contact form             ║
║   - POST /api/newsletter      Newsletter signup        ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});

export default app;
