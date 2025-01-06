import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";

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
                        position: "relative",
                        cursor: "pointer",
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
                            width: "60%",
                            height: "auto",
                            objectFit: "contain",
                            display: "block",
                            borderTop:"2px solid black",
                            borderBottom:"2px solid black",
                            borderRight:"2px solid black",
                            borderLeft:"2px solid black"
                        }}
                    />
                    <div
                        className="overlay"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "60%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            opacity: 0,
                            transition: "opacity 0.3s",
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
