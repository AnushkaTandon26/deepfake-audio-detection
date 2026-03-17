import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileAudio, X } from "lucide-react";

interface AudioDropzoneProps {
  file: File | null;
  onFileAccepted: (file: File) => void;
  onFileClear: () => void;
}

const AudioDropzone = ({ file, onFileAccepted, onFileClear }: AudioDropzoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) onFileAccepted(acceptedFiles[0]);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "audio/*": [".wav", ".mp3"] },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <AnimatePresence mode="wait">
      {!file ? (
        <motion.div key="dz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div
            {...getRootProps()}
            className={`glass-card-hover cursor-pointer p-8 text-center transition-all ${isDragActive ? "border-primary glow-primary" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-foreground">
                {isDragActive ? "Drop here" : "Drag & drop audio files or click to choose"}
              </p>
              <p className="text-xs text-muted-foreground">WAV, MP3 supported</p>
              <span className="mt-1 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground">
                Select file
              </span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div key="fi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="glass-card flex items-center gap-3 p-4"
        >
          <div className="rounded-lg bg-primary/10 p-2">
            <FileAudio className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onFileClear(); }}
            className="rounded-md p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioDropzone;
