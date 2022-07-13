import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BookInfo from './Component/BookInfo';
import Dashboard from './Component/Dashboard';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/bookinfo/:id" exact component={BookInfo} />    
        </Switch>
    </Router>
  );
}

export default App;
