import './Header.css';
import { useHistory , useLocation} from 'react-router-dom';
import { FiSettings } from "react-icons/fi";

function Header() {
    const history = useHistory();
    const location = useLocation();

    const onSetttingsClicked = () => {
        if (location.pathname.includes('settings')) {
            history.push('/');
        } else {
            history.push('/settings');
        }
    }

    return (
        <div className="mt-1 mb-4">
           <header className="row">
                <div className="col-md-11 title">
                    Kafka Flow
                </div>
                <div className="col-md-1 title">
                    <div className="float-end settings">
                        <FiSettings onClick={onSetttingsClicked}/>
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