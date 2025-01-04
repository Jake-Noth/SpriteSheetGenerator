import { useSaveCanvasStore } from "../SaveCanvasStore";

export default function SelectedFrames() {
    const { savedFrames } = useSaveCanvasStore();

    const sortedFrames = Object.entries(savedFrames).sort(
        ([keyA], [keyB]) => Number(keyA) - Number(keyB)
    );

    return (
        <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
            {sortedFrames.map(([key, dataUrl]) => (
                <div key={key} style={{ width: "100%", marginBottom: "10px" }}>
                    <img
                        src={dataUrl}
                        alt={`Frame ${key}`}
                        style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    />
                </div>
            ))}
        </div>
    );
}
