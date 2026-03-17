import { motion } from "framer-motion";
import { AudioWaveform, Brain, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: AudioWaveform,
    title: "Spectral Analysis",
    desc: "High-resolution spectrogram parsing to catch subtle artifacts.",
  },
  {
    icon: Brain,
    title: "Neural Embeddings",
    desc: "Representation learning distinguishes synthetic vs natural timbre.",
  },
  {
    icon: Zap,
    title: "Real-time API",
    desc: "Low-latency endpoints for streaming verification.",
  },
  {
    icon: Shield,
    title: "Adversarial Defense",
    desc: "Robust models trained against state-of-the-art generators.",
  },
];

const FeaturesSection = () => (
  <section id="technology" className="py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 text-3xl font-bold text-foreground"
      >
        Features
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-12 max-w-xl text-muted-foreground"
      >
        Cutting-edge deep learning tools to defend against audio deepfakes.
      </motion.p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="feature-card"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
