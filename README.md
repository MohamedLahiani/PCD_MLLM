# MLLM_PCD – Multimodal Large Language Model for Video Question Answering

This project focuses on developing a **multimodal language model** for **video-based question answering** using advanced deep learning techniques. The model is designed to process both video and text inputs to answer questions based on movie clips, leveraging recent advances in cross-modal learning.

## Models and Components

Three major components were integrated into the model pipeline:

- **Video Encoder** (CLIP ViT-L/14):
  - Extracts frame-level visual features from video clips.
  
- **Cross-Attention Layer**:
  - Aligns and fuses information between the video and text modalities.

- **Mixture of Experts (MoE)**:
  - Uses 4 experts to specialize the representation learning and improve performance.

- **Vicuna-v1.1 (LLM)**:
  - Processes the fused embeddings and generates natural language answers.

## Dataset

The **MTVQA (Movie Text-Video Question Answering)** dataset was used for training and evaluation. It contains:

- Short video clips from movies  
- Natural language questions and answers  
- Optional subtitles and metadata  
- Multiple-choice answer format

Video frames were extracted, and both visual and textual information were preprocessed for multimodal fusion.

## ⚙️ Tech Stack

### 🖥️ Frontend

- **React 19**: Latest React version for building the UI  
- **Vite**: Fast build tooling and development server  
- **Zustand**: Simple state management for React  
- **React Icons**: Icon library for UI elements  
- **CSS3**: Custom styling with CSS variables for theming  


## Technologies Used

- **Python 3.10**: Core programming language.
- **PyTorch 1.13.1 (CUDA 11.7)**: For deep learning model implementation and training.
- **Hugging Face Transformers**: For model loading, tokenization, and LLM integration.
- **CLIP ViT-L/14**: Video encoder for feature extraction.
- **Vicuna-v1.1**: Language model for generating answers.
- **Google Colab (T4 GPU)**: For training and experimentation.

## 📁 Project Structure
PCD-main/
├── videochat/ # Frontend application
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── assets/ # Application assets
│ │ │ ├── stores/ # Zustand store definitions
│ │ │ └── react.svg # React logo
│ │ ├── components/ # React components
│ │ │ ├── ChatInterface.jsx # Main chat component
│ │ │ └── ChatInterface.css # Styling for chat component
│ │ ├── App.jsx # Main application component
│ │ ├── App.css # Application styles
│ │ ├── main.jsx # Application entry point
│ │ └── index.css # Global styles
│ ├── .gitignore # Git ignore file
│ ├── package.json # Project dependencies
│ ├── eslint.config.js # ESLint configuration
│ ├── vite.config.js # Vite configuration
│ └── README.md # This file


## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **npm** or **yarn**


## Preliminary Results

*(Training still in progress)* – Below are expected or early-stage performance metrics on a small subset of MTVQA:

- **Model (Cross-Attention + MoE + Vicuna)**:
  - Accuracy: *to be determined*
  - BLEU / METEOR: *to be computed*
  - Qualitative outputs show improved reasoning over vision-only or text-only baselines.

## Acknowledgements

- Video QA dataset sourced from the [MTVQA GitHub repository](https://github.com/jayleicn/mTVRetrieval).
- LLM and CLIP components inspired by LLaVA and Flamingo architectures.
- Based on research in multimodal machine learning and MLLMs.
