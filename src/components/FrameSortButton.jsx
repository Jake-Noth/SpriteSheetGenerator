import { useContext } from "react";
import { VideoContext } from "../context/Contex";

export default function SortFrameByTime() {
    const { setOrderByTime, orderByTime } = useContext(VideoContext);

    const flipState = () => setOrderByTime(!orderByTime);

    return (
        <div id='order-frame-container'>
            <label id='order-frame-label'>
                Order frames by time
                <input id='order-frame-input' type="checkbox" checked={orderByTime} onChange={flipState} />
            </label>
        </div>
    );
}
