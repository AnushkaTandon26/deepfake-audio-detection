import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Scan } from "lucide-react";
import { toast } from "sonner";
import AudioDropzone from "@/components/AudioDropzone";
import AudioPlayer from "@/components/AudioPlayer";
import DetectionResult from "@/components/DetectionResult";

import { predictAudio, type PredictionResponse } from "@/lib/api";

const LiveDemo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const handleFileAccepted = (f: File) => {
    setFile(f);
    setResult(null);
  };

  const handleClear = () => {
    setFile(null);
    setResult(null);
  };

  const handleDetect = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await predictAudio(file);
      setResult(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Connection failed.";
      toast.error("Detection failed", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  const realProb = result ? (result.prediction === "Real" ? result.confidence * 100 : (1 - result.confidence) * 100) : 0;
  const fakeProb = result ? (result.prediction === "Fake" ? result.confidence * 100 : (1 - result.confidence) * 100) : 0;

  return (
    <section id="live-demo" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-foreground"
        >
          Live demo upload
        </motion.h2>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Upload side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <AudioDropzone file={file} onFileAccepted={handleFileAccepted} onFileClear={handleClear} />
            {file && <AudioPlayer file={file} />}
            <button onClick={handleDetect} disabled={!file || loading} className="btn-primary-glow flex w-full items-center justify-center gap-2">
              {loading ? (
                <><Loader2 className="h-5 w-5 animate-spin" />Analyzing...</>
              ) : (
                <><Scan className="h-5 w-5" />Start Detection</>
              )}
            </button>
          </motion.div>

          {/* Result side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card space-y-6 p-6"
          >
            <h3 className="text-lg font-semibold text-foreground">AI Detection Result</h3>

            {/* Probability bars */}
            <div className="space-y-4">
              <div>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-success font-medium">Real Probability</span>
                  <span className="font-mono text-foreground">{realProb.toFixed(2)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-success"
                    initial={{ width: 0 }}
                    animate={{ width: `${realProb}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-danger font-medium">Fake Probability</span>
                  <span className="font-mono text-foreground">{fakeProb.toFixed(2)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-danger"
                    initial={{ width: 0 }}
                    animate={{ width: `${fakeProb}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>

            {result && <DetectionResult prediction={result.prediction} confidence={result.confidence} />}

            {!result && !loading && (
              <p className="text-center text-sm text-muted-foreground">Upload an audio file and click detect to see results.</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
