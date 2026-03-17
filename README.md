# Deepfake Audio Detection AI

A full-stack AI-powered web application that detects whether an audio clip is **real or deepfake** using deep learning techniques. The system analyzes uploaded audio files and provides classification results with confidence scores in real time.

---

## Live Demo

Frontend: https://deepfake-audio-detection-anushkas-projects-6b91ec06.vercel.app/
Backend API: https://audio-detection-deepfake.onrender.com/

---

## Overview

This project integrates deep learning with a modern web interface to detect synthetic (deepfake) audio. It uses MFCC-based feature extraction and a trained CNN-Conformer model to classify audio authenticity.

---

## Features

* Upload audio files (WAV, MP3, FLAC, etc.)
* Detect real vs fake audio
* Confidence score visualization
* FastAPI-based REST API
* Modern responsive frontend
* Fully deployed (Vercel + Render)

---

## Tech Stack

### Frontend

* React (Vite + TypeScript)
* Tailwind CSS
* Axios

### Backend

* FastAPI
* TensorFlow (CNN-Conformer)
* Librosa
* NumPy

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Project Structure

```bash
deepfake-audio-detection/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── model/
│   └── utils/
│       └── preprocess.py
│
├── src/
├── public/
├── index.html
├── package.json
└── vite.config.ts
```

---

# Installation & Setup (Local)

## 1. Clone Repository

```bash
git clone https://github.com/your-username/deepfake-audio-detection.git
cd deepfake-audio-detection
```

---

## 2. Frontend Setup

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend will run at:

```bash
http://localhost:8080
```

---

## 3. Backend Setup

Go to backend folder:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

### Windows:

```bash
venv\Scripts\activate
```

### Mac/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend server:

```bash
uvicorn main:app --reload
```

Backend will run at:

```bash
http://127.0.0.1:8000
```

---

## 4. Connect Frontend to Backend

Create `.env` file in root:

```bash
VITE_API_URL=http://127.0.0.1:8000
```

Restart frontend after adding env.

---

## API Usage

### POST /predict

Upload an audio file:

* Endpoint:

```bash
http://127.0.0.1:8000/predict
```

* Request:

  * Form-data → file

* Response:

```json
{
  "prediction": "Fake",
  "confidence": 0.97
}
```

---

## Model Details

* Architecture: CNN + Conformer
* Input Shape: (128, 128, 1)
* Feature Extraction: MFCC (Librosa)
* Framework: TensorFlow

---

## Deployment

### Frontend (Vercel)

* Framework: Vite
* Build Command:

```bash
npm run build
```

* Output Directory:

```bash
dist
```

* Environment Variable:

```bash
VITE_API_URL=https://audio-detection-deepfake.onrender.com
```

---

### Backend (Render)

* Root Directory: backend
* Build Command:

```bash
pip install -r requirements.txt
```

* Start Command:

```bash
uvicorn main:app --host 0.0.0.0 --port 10000
```

* Environment Variable:

```bash
PYTHON_VERSION=3.10.13
```

---

## Challenges Faced

* TensorFlow deployment issues on cloud platforms
* Large model handling
* Audio preprocessing consistency
* API integration with frontend
* Cold start latency in Render

---

## Future Improvements

* Real-time microphone input
* Faster inference optimization
* GPU deployment support
* Improved model accuracy
* Batch audio processing

---

## Author

Anushka Tandon
Computer Science Student
Interested in AI, Deep Learning, and Full-Stack Development

---

## License

This project is for educational and research purposes only.
