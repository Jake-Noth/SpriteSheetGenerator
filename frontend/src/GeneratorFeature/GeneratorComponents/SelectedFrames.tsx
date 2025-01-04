import { useSaveCanvasStore } from "../SaveCanvasStore";

export default function SelectedFrames() {
    const { savedFrames, deleteSavedFrame } = useSaveCanvasStore();

    const sortedFrames = Object.entries(savedFrames).sort(
        ([keyA], [keyB]) => Number(keyA) - Number(keyB)
    );

    return (
        <div id="selectedFrames" style={{ width: "100%", height: "90%", overflowY: "auto" }}>
            {sortedFrames.map(([key, dataUrl]) => (
                <div
                    key={key}
                    style={{
                        width: "100%",
                        marginBottom: "10px",
                        position: "relative", // Needed for absolute positioning of overlay
                        cursor: "pointer", // Change cursor to pointer to indicate interactivity
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                        const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement;
                        if (overlay) overlay.style.opacity = "1";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                        const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement;
                        if (overlay) overlay.style.opacity = "0";
                    }}
                    onClick={()=>{
                        deleteSavedFrame(Number(key))
                    }}
                >
                    <img
                        src={dataUrl}
                        alt={`Frame ${key}`}
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            display: "block", // Remove extra space under image
                        }}
                    />
                    <div
                        className="overlay"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                            color: "white", // Text color
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            opacity: 0, // Initially hidden
                            transition: "opacity 0.3s", // Smooth transition
                            fontSize: "18px",
                        }}
                    >
                        Remove
                    </div>
                </div>
            ))}
        </div>
    );
}
