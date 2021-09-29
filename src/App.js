import './App.css';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Flow from './components/Flow.js';
import Header from './components/Header.js';
import Settings from './components/Settings.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import example from './topology/topology-example.json';
import getTopology from './kafka/topology-service.js';

function App() {

  const [settings, setSettings] = useState({
    topology: example.simple,
    topologyUrl: "",
    offsetUrl: "",
    offsetInterval: 2000,
    offsetCheck: false
  });

  const onSettingChanged = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings({ ...settings, [e.target.id]: value });
  }

  const onLoadTopology = (e) => {
    getTopology(settings.topologyUrl)
      .then((response) => response.text())
      .then((loadedTopology) => {
        setSettings({ ...settings, topology: loadedTopology });
      })
      .catch(() => onError('Failed to load topology'))
  }

  const onError = (message) => {
    toast.error(message);
  }

  return (
    <Router>
      <div className="container-fluid">
        <Toaster />
        <Header />
        <Switch>
          <Route path="/settings">
            <Settings settings={settings} onSettingChanged={onSettingChanged} onLoadTopology={onLoadTopology} />
          </Route>
          <Route path="/">
            <Flow settings={settings} onError={onError} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
