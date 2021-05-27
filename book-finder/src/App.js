import './Styles/App.css';
import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Home from './Home/Home';
import Library from './Library/Library'
import UserContextProvider from './Contexts/UserContextProvider';

const App = props => {

  return (
    <UserContextProvider>
      <Router>
        <ul><Link to="/">Home</Link></ul>
        <ul><Link to="/library">Library</Link></ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/library" component={Library} />
        </Switch>
      </Router>
    </UserContextProvider>
    
  )
}

export default App;