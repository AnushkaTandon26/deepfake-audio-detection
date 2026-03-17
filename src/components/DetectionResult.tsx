import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert } from "lucide-react";

interface DetectionResultProps {
  prediction: "Real" | "Fake";
  confidence: number;
}

const DetectionResult = ({ prediction, confidence }: DetectionResultProps) => {
  const isReal = prediction === "Real";
  const confidencePercent = (confidence * 100).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`glass-card overflow-hidden p-6 ${isReal ? "glow-success" : "glow-danger"}`}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.div
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className={`rounded-2xl p-4 ${
            isReal ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          }`}
        >
          {isReal ? (
            <ShieldCheck className="h-10 w-10" />
          ) : (
            <ShieldAlert className="h-10 w-10" />
          )}
        </motion.div>

        <div>
          <h3
            className={`text-2xl font-bold ${
              isReal ? "text-success" : "text-danger"
            }`}
          >
            {prediction} Audio
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">Detection Result</p>
        </div>

        <div className="w-full">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Confidence</span>
            <span className="font-mono font-semibold text-foreground">
              {confidencePercent}%
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-secondary">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${
                isReal
                  ? "bg-gradient-to-r from-success to-accent"
                  : "bg-gradient-to-r from-danger to-orange-500"
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetectionResult;
