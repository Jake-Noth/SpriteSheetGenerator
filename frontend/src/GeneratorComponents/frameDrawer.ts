
export const drawFrame = (fileObj: string, time: number, canvas:HTMLCanvasElement) => {
        
    const video = document.createElement("video");
    video.src = fileObj;

    video.addEventListener("loadeddata", () => {
        video.currentTime = time;
    });

    video.addEventListener("seeked", () => {
        if (canvas) {
            const canvasWidth = canvas.clientWidth;
            const canvasHeight = canvas.clientHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const ctx = canvas.getContext("2d");
            if (ctx) {
                const videoWidth = video.videoWidth;
                const videoHeight = video.videoHeight;

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

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
            }
        }
    });
};