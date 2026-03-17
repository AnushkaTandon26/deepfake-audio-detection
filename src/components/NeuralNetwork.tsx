import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 500;
    const h = 400;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    // Generate nodes in layers
    const layers = [4, 6, 8, 6, 4];
    const nodes: { x: number; y: number; layer: number }[] = [];
    layers.forEach((count, li) => {
      const x = 60 + (li / (layers.length - 1)) * (w - 120);
      for (let i = 0; i < count; i++) {
        const y = (h / (count + 1)) * (i + 1);
        nodes.push({ x, y, layer: li });
      }
    });

    // Generate connections
    const connections: [number, number][] = [];
    let offset = 0;
    for (let li = 0; li < layers.length - 1; li++) {
      const nextOffset = offset + layers[li];
      for (let i = 0; i < layers[li]; i++) {
        for (let j = 0; j < layers[li + 1]; j++) {
          if (Math.random() > 0.3) {
            connections.push([offset + i, nextOffset + j]);
          }
        }
      }
      offset = nextOffset;
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      // Draw connections
      connections.forEach(([a, b], idx) => {
        const na = nodes[a];
        const nb = nodes[b];
        const pulse = Math.sin((frame + idx * 10) * 0.02) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `hsla(175, 80%, 45%, ${0.06 + pulse * 0.1})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin((frame + i * 15) * 0.03) * 0.5 + 0.5;
        const r = 3 + pulse * 2;

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(175, 80%, 45%, ${0.08 + pulse * 0.1})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(175, 80%, 50%, ${0.5 + pulse * 0.5})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="glass-card overflow-hidden p-4"
    >
      <canvas ref={canvasRef} className="block" />
    </motion.div>
  );
};

export default NeuralNetwork;
