import './Toolbar.css';
import { FiMaximize, FiMinimize, FiSettings } from "react-icons/fi";
import ReactTooltip from 'react-tooltip';

function Toolbar({ onSetttingsClicked, onCompactClicked, isCompact }) {

    return (
        <div className="float-end toolbar">

            <ReactTooltip id="tooltip-compact"
                place="left"
                effect="solid"
                type="light"
                border
                borderColor="lightgrey">

                {isCompact ? "Expand topology" : "Compact topology"}
            </ReactTooltip>

            <span className="toolbar-icon" data-tip data-for="tooltip-compact">
                {isCompact ?
                    <FiMaximize onClick={onCompactClicked} data-testid="expand-topology"/> :
                    <FiMinimize onClick={onCompactClicked} data-testid="compact-topology"/>
                }
            </span>
            <span className="toolbar-icon">
                <FiSettings onClick={onSetttingsClicked} />
            </span>
        </div>
    )
}

export default Toolbar;