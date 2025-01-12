import { useSaveCanvasStore } from "../Stores/SaveCanvasStore";

interface NextModalProps {
    closeModal: () => void;
    showLoading: (UUID: string) => void
}

export default function NextModal(props: NextModalProps) {

    const { savedFrames } = useSaveCanvasStore()

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const processFrames = async () => {
        if (Object.keys(savedFrames).length > 0) {
            const UUID = crypto.randomUUID();

            const formData = new FormData();

            formData.append('UUID', UUID);

            for (const [key, dataUrl] of Object.entries(savedFrames)) {
                const blob = dataURLToBlob(dataUrl);
                formData.append('frames', blob, `${key}.png`);
            }

            try {
                const response = await fetch('http://localhost:8000/process', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                console.log('Response from server:', responseData);
                props.showLoading(UUID)
                return responseData;
            } catch (error) {
                console.error('Error during upload:', error);
            }
        } else {
            console.log('No frames to process.');
        }
    };

    const dataURLToBlob = (dataUrl: string) => {
        const [header, base64] = dataUrl.split(',');
        const match = header.match(/:(.*?);/);

        if (!match) {
            throw new Error('Invalid Data URL format');
        }

        const mime = match[1];
        const binary = atob(base64);
        const array = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
        }

        return new Blob([array], { type: mime });
    };



    return (
        <div
            onClick={props.closeModal}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            <div
                onClick={handleClick}
                style={{
                    height: "auto",
                    width: "20%",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                }}
            >
                <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
                    Are you sure you want to process these images?
                </h2>

                <div style={{ display: "flex", gap: "15px" }}>
                    <button
                        onClick={props.closeModal}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#f1f1f1",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#ddd"}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#f1f1f1"}
                    >
                        Back
                    </button>
                    <button
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#0056b3"}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#007BFF"}
                        onClick={processFrames}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
