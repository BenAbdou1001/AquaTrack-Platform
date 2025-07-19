## Technical Overview: Dead vs. Alive Fish Detection

Monitoring fish health in dynamic aquatic environments is a mission-critical task—now fully automated by our state-of-the-art detection pipeline. Leveraging cutting-edge computer vision, we accurately localize each fish and classify its vitality status (`alive` vs. `dead`) in milliseconds, even under challenging underwater conditions.

---

### 1. Introduction

This solution emerged from tackling real-world challenges: sparse annotated data, variable lighting, water turbidity, and multi-scale fish instances. Through intensive dataset curation and model engineering, we built a high-performance system capable of edge deployment and cloud scalability.

---

### 2. Dataset

* **Size**: 980 images (train/valid/test split), manually reviewed for label consistency
* **Annotations**: Precise bounding boxes with two classes (`fish-alive`, `fish-dead`)
* **Preprocessing**: Resolution normalization to 640×640, on-the-fly augmentations (flip, color jitter) to simulate underwater variations

Our dataset preparation ensured robustness to reflections, shadows, and backscatter phenomena common in aquatic imagery.

---

### 3. Model Architecture

At its core is **YOLOv8n**, the ultra-lightweight variant of the latest YOLO series:

* **Backbone**: CSPDarknet-inspired, optimized for low latency
* **Neck**: PANet-style multi-scale feature aggregation for detecting both small fry and large adult fish
* **Head**: Dual-headed classifier/regressor predicting bounding boxes and vitality scores simultaneously

This combination delivers an inference time of **<8 ms per frame** on a Tesla T4 GPU, with model weight size under **15 MB**.

---

### 4. Evaluation Metrics

We rigorously evaluated on the held-out test set:

* **Precision (B)**: 0.9029
* **Recall (B)**: 0.9114
* **mAP\@0.5 (B)**: 0.9240
* **mAP\@0.5–0.95 (B)**: 0.5114

These metrics demonstrate a strong balance between false positives and false negatives—critical for reliable monitoring in production.

---

### 5. Inference & Deployment

**Unified API**: Our inference script supports image, folder, video, and webcam inputs with a single call:

```bash
yolo predict model=best.pt source=input.jpg --save
```

**Gradio App**: Hosted on Hugging Face Spaces, offering a polished UI with:

* **Image Tab**: Instant single-image analysis
* **Video Tab**: Batch or streaming video inference

**Requirements**: `ultralytics`, `opencv-python-headless`, `gradio`

Setup is as simple as cloning the Space—no local installs required.

You can see its link here:

[https://huggingface.co/spaces/bahae9/dead\_alive\_fish\_detector](https://huggingface.co/spaces/bahae9/dead_alive_fish_detector)

---

### 6. Performance Highlights

* **Real-time throughput**: >25 FPS on commodity GPUs
* **Edge compatibility**: Model size ≈15 MB, well-suited for embedded hardware
* **Environmental robustness**: Validated across diverse water clarities and lighting scenarios

This performance profile ensures continuous, scalable monitoring for aquaculture farms, environmental surveys, or research deployments.

---

### 7. Conclusion

From the painstaking curation of underwater datasets to fine-tuning a compact YOLOv8n detector, this project exemplifies high-impact engineering under real-world constraints. The result is a resilient, high-speed `Dead vs. Alive` Fish Detector—ready for production in the most demanding aquatic environments.
