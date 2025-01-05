interface NextModalProps {
    closeModal: () => void;
}

export default function NextModal(props: NextModalProps) {

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
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
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
