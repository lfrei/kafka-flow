import React from 'react';
import getTopology from '../kafka/topology-service.js';
import isValidTopology from '../topology/topology-validator.js';

function Settings({ settings, onSettingChanged, onError }) {

    const onChangeSetting = (e) => {
        const key = e.target.id;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        onSettingChanged(key, value)
    }

    const onLoadTopology = () => {
        getTopology(settings.topologyUrl)
            .then((response) => response.text())
            .then((loadedTopology) => {
                if (isValidTopology(loadedTopology)) {
                    onSettingChanged('topology', loadedTopology);
                } else {
                    onError('Invalid topology loaded');
                }
            })
            .catch(() => onError('Failed to load topology'))
    }

    return (
        <form>
            <h5>Topology</h5>

            <div className="form-group mb-2">
                <label htmlFor="topology">Topology Description</label>
                <textarea
                    rows="10"
                    className="form-control"
                    placeholder="Topology"
                    id="topology"
                    value={settings.topology}
                    onChange={onChangeSetting}
                />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="topologyUrl">Topology URL</label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="URL to Topology Describe (optional)"
                        id="topologyUrl"
                        value={settings.topologyUrl}
                        onChange={onChangeSetting}
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

            <div className="form-check mb-2">
                <label className="form-check-label" htmlFor="offsetCheck">Show internal Stores</label>
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="topologyShowStores"
                    checked={settings.topologyShowStores}
                    onChange={onChangeSetting}
                />
            </div>

            <h5 className="mt-5">Offsets</h5>

            <div className="form-check mb-2">
                <label className="form-check-label" htmlFor="offsetCheck">Enable Offset Polling</label>
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="offsetCheck"
                    checked={settings.offsetCheck}
                    onChange={onChangeSetting}
                />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="offsetUrl">Offset URL</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="URL to load Offsets (optional)"
                    id="offsetUrl"
                    value={settings.offsetUrl}
                    onChange={onChangeSetting}
                    disabled={!settings.offsetCheck}
                />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="offsetInterval">Offset Interval (ms)</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="URL to load Offsets (optional)"
                    id="offsetInterval"
                    value={settings.offsetInterval}
                    onChange={onChangeSetting}
                    disabled={!settings.offsetCheck}
                />
            </div>
        </form>
    )
}

export default Settings;