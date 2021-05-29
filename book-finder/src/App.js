import './Styles/App.css';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Home from './Home/Home';
import Library from './Library/Library';
import EditBook from './EditBook/EditBook';
import Login from './Login/Login';
import UserContextProvider from './Contexts/UserContextProvider';
import BookContextProvider from './Contexts/BookContextProvider';
import Navbar from './Components/Navbar';

const App = props => {
  return (
    <UserContextProvider>
      <BookContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/library" component={Library} />
            <Route path="/edit" component={EditBook} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </BookContextProvider>
    </UserContextProvider>
  )
}

export default App;