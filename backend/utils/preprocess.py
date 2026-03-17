"""
Audio preprocessing for Deepfake Detection
Converts audio → Mel Spectrogram (128x128)
"""

import numpy as np
import librosa


def preprocess_audio(
    file_path: str,
    sr: int = 22050,
    n_mels: int = 128,
    max_len: int = 128,
):
    # Load audio
    audio, sr = librosa.load(file_path, sr=sr, mono=True)

    # Limit audio (important for speed + consistency)
    audio = audio[:3 * sr]

    # Normalize audio
    if np.max(np.abs(audio)) > 0:
        audio = audio / np.max(np.abs(audio))

    # Create Mel Spectrogram
    mel = librosa.feature.melspectrogram(
        y=audio,
        sr=sr,
        n_mels=n_mels
    )

    # Convert to log scale
    mel = librosa.power_to_db(mel, ref=np.max)

    # Normalize spectrogram
    mel = (mel - np.mean(mel)) / (np.std(mel) + 1e-8)

    # Resize to fixed shape
    if mel.shape[1] < max_len:
        pad_width = max_len - mel.shape[1]
        mel = np.pad(mel, ((0, 0), (0, pad_width)), mode="constant")
    else:
        mel = mel[:, :max_len]

    # Final shape → (1, 128, 128, 1)
    mel = mel.reshape(1, n_mels, max_len, 1)

    return mel