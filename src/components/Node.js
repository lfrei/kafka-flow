import './Node.css';

function Node({ type, name, offset }) {
    return (
        <div className={type}>
            {name}
            {offset >= 0 &&
                <span>:
                    <div className="offset">{offset}</div>
                </span>
            }
        </div>
    )
}

export default Node;