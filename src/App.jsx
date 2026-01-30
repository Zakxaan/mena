import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import HowWeWork from "./components/HowWeWork";
import Services from "./components/Services";
import UseCases from "./components/UseCases";
import Footer from "./components/Footer";
import useReveal from "./components/useReveal";

export default function App() {
  useReveal();

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <HowWeWork />
      <Services />
      <UseCases />
      <Footer />
    </>
  );
}
