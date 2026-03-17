import { motion } from "framer-motion";

const techs = ["TensorFlow", "Keras", "CNN-Conformer", "MFCC", "librosa", "FastAPI", "Python"];

const TechSection = () => (
  <section className="py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-3xl font-bold text-foreground"
      >
        Technology
      </motion.h2>
      <div className="flex flex-wrap gap-3">
        {techs.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="tech-badge"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  </section>
);

export default TechSection;
