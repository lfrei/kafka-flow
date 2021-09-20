import './App.css';
import Flow from './components/Flow.js'
import Header from './components/Header.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route path="/">
            <Flow />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
