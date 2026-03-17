import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import NeuralNetwork from "@/components/NeuralNetwork";
import WaveformCanvas from "@/components/WaveformCanvas";
import HowItWorks from "@/components/HowItWorks";
import LiveDemo from "@/components/LiveDemo";
import FeaturesSection from "@/components/FeaturesSection";
import TechSection from "@/components/TechSection";

const Index = () => {
  const scrollToDemo = () => {
    document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20 dot-grid">
        {/* Background glows */}
        <div className="pointer-events-none absolute -left-60 top-20 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[150px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Cyber Security • Deep Learning • Real-Time Analysis</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              <span className="text-foreground">Deepfake Audio</span>
              <br />
              <span className="gradient-text-cyan">Detection AI</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Detect Real vs Fake Audio using Advanced Deep Learning. Upload recordings and let the system analyze waveforms, spectrograms, and neural embeddings to determine authenticity with confidence scores.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={scrollToDemo} className="btn-primary-glow">
                Upload Audio
              </button>
              <button onClick={scrollToDemo} className="btn-outline-glow">
                Start Scan
              </button>
            </div>

            <div className="mt-10">
              <WaveformCanvas />
            </div>
          </motion.div>

          {/* Right */}
          <div className="hidden lg:block">
            <NeuralNetwork />
          </div>
        </div>
      </section>

      <HowItWorks />
      <LiveDemo />
      <FeaturesSection />
      <TechSection />

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 Deepfake Labs — Powered by CNN-Conformer Deep Learning</p>
      </footer>
    </div>
  );
};

export default Index;
