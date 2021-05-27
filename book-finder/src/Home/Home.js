import './Styles/App.css';
import {useState, Fragment} from 'react';
import Search from './Components/Search';
import Login from './Components/Login';

const App = props => {
  const [token, setToken] = useState(null);
  return (
    <Fragment>
      <Login token={token} setToken={setToken} />
      <Search />
    </Fragment>
  )
}

export default App;