import './Header.css';
import { FiSettings } from "react-icons/fi";

function Header() {
    return (
        <div className="header">
           <header className="row">
                <div className="col-md-11 title">
                    Kafka Flow
                </div>
                <div className="col-md-1 title">
                    <div className="float-end">
                        <FiSettings/>
                    </div>
                </div>
                <div className="col-md-12 subtitle">
                    Visualize the data flowing through a kafka streams topology
                </div>
            </header> 
        </div>
    )
}

export default Header;