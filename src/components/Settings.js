import React from 'react';

function Settings({ settings, onSettingChanged }) {

    const onLoadTopology = (e) => {
        console.log(`Load topology from ${settings.topologyUrl}`);
        //TODO load topology from url
    } 

    return (
        <form>
            <div className="form-group">
                <label htmlFor="topology">Topology</label>
                <textarea
                    rows="10"
                    className="form-control"
                    placeholder="Topology"
                    id="topology"
                    value={settings.topology}
                    onChange={onSettingChanged}
                />
            </div>

            <div className="form-group">
                <label htmlFor="topologyUrl">Topology URL</label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="URL to Topology Describe (optional)"
                        id="topologyUrl"
                        value={settings.topologyUrl}
                        onChange={onSettingChanged}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        id="topologyLoad"
                        disabled={!settings.topologyUrl}
                        onClick={onLoadTopology}>
                        Load Topology
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="offsetUrl">Offset URL</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="URL to load Offsets (optional)"
                    id="offsetUrl"
                    value={settings.offsetUrl}
                    onChange={onSettingChanged}
                />
            </div>

            <div className="form-group">
                <label htmlFor="offsetInterval">Offset Interval (ms)</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="URL to load Offsets (optional)"
                    id="offsetInterval"
                    value={settings.offsetInterval}
                    onChange={onSettingChanged}
                />
            </div>
        </form>
    )
}

export default Settings;