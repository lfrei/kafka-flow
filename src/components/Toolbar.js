import './Toolbar.css';
import { FiMaximize, FiMinimize, FiSettings } from "react-icons/fi";

function Toolbar({ onSetttingsClicked, onCompactClicked, isCompact }) {

    return (
        <div className="float-end toolbar">
            <span className="toolbar-icon">
                {isCompact ?
                    <FiMaximize onClick={onCompactClicked} /> :
                    <FiMinimize onClick={onCompactClicked} />
                }
            </span>
            <span className="toolbar-icon">
                <FiSettings onClick={onSetttingsClicked} />
            </span>
        </div>
    )
}

export default Toolbar;