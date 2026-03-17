import { motion } from "framer-motion";
import { Upload, Brain, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "1. Ingest",
    desc: "Upload audio or stream in real-time with secure edge encryption.",
  },
  {
    icon: Brain,
    title: "2. Analyze",
    desc: "Neural spectrograms and embeddings evaluated by deep classifiers.",
  },
  {
    icon: ShieldCheck,
    title: "3. Verdict",
    desc: "Confidence scores and interpretability overlays to detect synthetic patterns.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-3xl font-bold text-foreground"
      >
        How it works
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="feature-card"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <step.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
