import './Toolbar.css';
import { FiMaximize, FiMinimize, FiSettings } from "react-icons/fi";
import ReactTooltip from 'react-tooltip';

function Toolbar({ onSetttingsClicked, onCompactClicked, isCompact }) {

    return (
        <div className="float-end toolbar">

            <ReactTooltip
                place="left"
                effect="solid"
                type="light"
                border="true"
                borderColor="lightgrey">
            </ReactTooltip>

            <span className="toolbar-icon" data-tip="Compact topology">
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