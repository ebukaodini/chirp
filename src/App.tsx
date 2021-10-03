import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Posts from './pages/Posts';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/posts' component={Posts} />
      </Switch>
    </Router>
  );
}

export default App;
