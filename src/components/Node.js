import './Node.css';
import ReactTooltip from 'react-tooltip';

function Node({ type, name, offset }) {
    const showTooltip = name.length > 26;
    const showOffset = offset >= 0;

    return (
        <div>
            {showTooltip &&
                <ReactTooltip id={name}
                    place="bottom"
                    effect="solid"
                    type="light"
                    border="true"
                    borderColor="lightgrey"
                    offset={{ bottom: 10 }}>

                    <p>{name}</p>
                </ReactTooltip>
            }

            <div className={type} data-tip data-for={name}>
                {name}
                {showOffset &&
                    <span>:
                        <div className="offset">{offset}</div>
                    </span>
                }
            </div>
        </div>
    )
}

export default Node;