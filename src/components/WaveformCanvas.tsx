import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const WaveformCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 500;
    const h = 120;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = "100%";
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const actualW = canvas.clientWidth || w;

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, actualW, h);
      frame++;

      // Draw two sine waves
      const drawWave = (color: string, freq: number, amp: number, phase: number) => {
        ctx.beginPath();
        for (let x = 0; x < actualW; x++) {
          const y =
            h / 2 +
            Math.sin((x * freq) / actualW + frame * 0.02 + phase) * amp +
            Math.sin((x * freq * 2.5) / actualW + frame * 0.015 + phase) * (amp * 0.3);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      drawWave("hsla(175, 80%, 50%, 0.7)", 8, 25, 0);
      drawWave("hsla(260, 60%, 60%, 0.5)", 6, 20, 2);

      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="glass-card overflow-hidden p-4"
    >
      <canvas ref={canvasRef} />
    </motion.div>
  );
};

export default WaveformCanvas;
