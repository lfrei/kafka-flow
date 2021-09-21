import './App.css';
import React, { useState } from 'react';
import Flow from './components/Flow.js'
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
    offsetUrl: "http://localhost:8080/offset",
    offsetInterval: 2000,
  });

  const onSettingChanged = (e) => {
    setSettings({ ...settings, [e.target.id]: e.target.value });
  }

  const onLoadTopology = (e) => {
    getTopology(settings.topologyUrl).then((loadedTopology) => {
      setSettings({ ...settings, topology: loadedTopology });
    })
  }

  return (
    <Router>
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route path="/settings">
            <Settings settings={settings} onSettingChanged={onSettingChanged} onLoadTopology={onLoadTopology} />
          </Route>
          <Route path="/">
            <Flow settings={settings} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
