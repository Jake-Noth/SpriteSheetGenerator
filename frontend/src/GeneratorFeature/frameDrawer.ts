export const drawFrame = async (video: HTMLVideoElement, time: number, canvas: HTMLCanvasElement) => {
    const calculateDrawDimensions = (
        videoWidth: number,
        videoHeight: number,
        canvasWidth: number,
        canvasHeight: number
    ) => {
        const videoAspectRatio = videoWidth / videoHeight;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (videoAspectRatio > canvasAspectRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / videoAspectRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * videoAspectRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        }

        return { drawWidth, drawHeight, offsetX, offsetY };
    };

    const drawCanvas = () => {
        if (!canvas) return;

        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { videoWidth, videoHeight } = video;
        const { drawWidth, drawHeight, offsetX, offsetY } = calculateDrawDimensions(
            videoWidth,
            videoHeight,
            canvasWidth,
            canvasHeight
        );

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
    };

    try {
        video.currentTime = time;
        await seekVideo(video);
        drawCanvas();
    } catch (error) {
        console.error("Error while drawing frame:", error);
    }
};

export const seekVideo = (video: HTMLVideoElement): Promise<void> => {
    return new Promise((resolve, reject) => {
        const onSeeked = () => {
            cleanup();
            resolve();
        };

        const onError = () => {
            cleanup();
            reject(new Error("Error while seeking video."));
        };

        const cleanup = () => {
            video.removeEventListener("seeked", onSeeked);
            video.removeEventListener("error", onError);
        };

        video.addEventListener("seeked", onSeeked);
        video.addEventListener("error", onError);

        // If the video is already at the desired state, resolve immediately.
        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            cleanup();
            resolve();
        }
    });
};
