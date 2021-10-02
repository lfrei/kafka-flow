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

function App() {

  const [settings, setSettings] = useState({
    topology: example.simple,
    topologyUrl: "",
    topologyCompact: false,
    topologyShowStores: true,
    offsetUrl: "",
    offsetInterval: 2000,
    offsetCheck: false
  });

  const onSettingChanged = (key, value) => {
    setSettings({ ...settings, [key]: value });
  }

  const onError = (message) => {
    toast.error(message);
  }

  return (
    <Router>
      <div className="container-fluid">
        <Toaster />
        <Header settings={settings} onSettingChanged={onSettingChanged} />
        <Switch>
          <Route path="/settings">
            <Settings settings={settings} onSettingChanged={onSettingChanged} onError={onError} />
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
