# Deepfake Audio Detection — Backend

## Setup

```bash
cd backend
pip install -r requirements.txt
```

## Add your model

Place your trained model at:
```
backend/model/cnn_conformer.h5
```

## Run

```bash
python main.py
```

Server starts at `http://localhost:8000`

## API

### `POST /predict`
Upload an audio file (wav/mp3) and get:
```json
{
  "prediction": "Real" or "Fake",
  "confidence": 0.9723
}
```

### `GET /health`
Health check endpoint.

## Frontend Connection

Set the environment variable in your frontend `.env`:
```
VITE_API_URL=http://localhost:8000
```
