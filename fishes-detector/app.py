import gradio as gr
import cv2
from ultralytics import YOLO
import tempfile
import os

# Load your trained model once at startup
model = YOLO("dead_vs_alive/run50/weights/best.pt")

def infer_image(img):
    """
    img: a numpy array in RGB format from Gradio
    returns: annotated RGB image
    """
    result = model(img)[0]
    annotated = result.plot()  # returns RGB annotated image
    return annotated

def infer_video(video_file):
    """
    video_file: path to uploaded video file
    returns: path to annotated video file
    """
    # Load video
    cap = cv2.VideoCapture(video_file)
    fps = cap.get(cv2.CAP_PROP_FPS)
    width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # Temp output
    out_path = tempfile.mktemp(suffix=".mp4")
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(out_path, fourcc, fps, (width, height))

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        # Convert BGR to RGB for model
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        res = model(rgb)[0]
        # Plot returns RGB annotated
        ann_rgb = res.plot()
        # Convert back to BGR for writing
        ann_bgr = cv2.cvtColor(ann_rgb, cv2.COLOR_RGB2BGR)
        writer.write(ann_bgr)

    cap.release()
    writer.release()
    return out_path

# Build the Gradio interface
with gr.Blocks() as demo:
    gr.Markdown("# Dead vs Alive Fish Detector")
    with gr.Tabs():
        with gr.TabItem("Image"):
            inp_img = gr.Image(type="numpy", label="Upload an Image")
            out_img = gr.Image(type="numpy", label="Annotated Image")
            btn_img = gr.Button("Run Inference")
            btn_img.click(fn=infer_image, inputs=inp_img, outputs=out_img)

        with gr.TabItem("Video"):
            inp_vid = gr.Video(label="Upload a Video")
            out_vid = gr.Video(label="Annotated Video")
            btn_vid = gr.Button("Run Inference")
            btn_vid.click(fn=infer_video, inputs=inp_vid, outputs=out_vid)

    gr.Markdown(
        """
        **Usage**:  
        - On the **Image** tab, upload a still photo → click **Run Inference** to see detected fish.  
        - On the **Video** tab, upload a clip or point to your webcam → click **Run Inference** to process the entire video.  
        """
    )

if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=int(os.environ.get("PORT", 7860)))