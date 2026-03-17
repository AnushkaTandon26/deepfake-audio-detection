from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
import tensorflow as tf
import librosa
import soundfile as sf

from utils.preprocess import preprocess_audio

# ─── LOAD MODEL ────────────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "cnn_conformer.h5")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model not found at {MODEL_PATH}")

model = tf.keras.models.load_model(MODEL_PATH)

print("✅ Model Loaded")
print("Input shape:", model.input_shape)
print("Output shape:", model.output_shape)

# Warmup (removes first delay)
model.predict(tf.zeros((1, 128, 128, 1)))

# ─── APP ───────────────────────────────────────────────────────
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    tmp_path = None

    try:
        print("\n=== NEW REQUEST ===")

        if not file.filename:
            raise HTTPException(status_code=400, detail="No file uploaded")

        # Save uploaded file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        print("📁 File saved")

        # 🔥 FORCE CONVERT TO WAV (fix mp3 issue)
        audio, sr = librosa.load(tmp_path, sr=22050)
        sf.write(tmp_path, audio, sr)

        # Preprocess → (1,128,128,1)
        features = preprocess_audio(tmp_path)
        print("📊 Shape:", features.shape)

        # Predict
        pred = model.predict(features, verbose=0)
        print("🤖 Raw:", pred)

        # Interpret output
        if pred.shape[-1] == 1:
            conf = float(pred[0][0])
            label = "Real" if conf > 0.5 else "Fake"
            conf = conf if conf > 0.5 else 1 - conf

        elif pred.shape[-1] == 2:
            real = float(pred[0][0])
            fake = float(pred[0][1])
            label = "Real" if real > fake else "Fake"
            conf = max(real, fake)

        else:
            raise Exception(f"Unexpected output shape: {pred.shape}")

        result = {
            "prediction": label,
            "confidence": round(conf, 4)
        }

        print("✅ Result:", result)
        return result

    except Exception as e:
        print("🔥 ERROR:", repr(e))
        raise HTTPException(status_code=500, detail=repr(e))

    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)


# ─── RUN ───────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)