import './Header.css';
import Toolbar from './Toolbar.js';
import { useHistory, useLocation } from 'react-router-dom';

function Header({ settings, onSettingChanged }) {
    const history = useHistory();
    const location = useLocation();

    const onSetttingsClicked = () => {
        if (location.pathname.includes('settings')) {
            history.push('/');
        } else {
            history.push('/settings');
        }
    }

    const onToggleCompact = () => {
        onSettingChanged('topologyCompact', !settings.topologyCompact);
    }

    return (
        <div className="mt-1 mb-4">
            <header className="row">
                <div className="col-md-11 title">
                    Kafka Flow
                </div>
                <div className="col-md-1 title">
                    <Toolbar onSetttingsClicked={onSetttingsClicked} onCompactClicked={onToggleCompact} isCompact={settings.topologyCompact} />
                </div>
                <div className="col-md-12 subtitle">
                    Visualize the data flowing through a kafka streams topology
                </div>
            </header>
        </div>
    )
}

export default Header;