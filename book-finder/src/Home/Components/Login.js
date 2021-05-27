import {useState, useContext} from 'react';
//import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {UserContext} from '../../Contexts/UserContextProvider';

const Login = ({token, setToken}) => {
    const {user, setUser} = useContext(UserContext);
    const [username, setUsername] = useState(user);
    //const [password, setPassword] = useState("");

    /*
    const getDots = password => {
        let hidden = "";
        for(let i = 0; i < password.length; i++) {
            hidden += "•";
        }
        return hidden;
    }

    const handlePasswordChange = e => {
        const val = e.target.value;
        if(val.length < password.length) setPassword(password.substring(0, val.length));
            
        else setPassword(password + val.substring(val.length - 1));
    }
    const handleLogin = e => {
        axios.post('http://localhost:3001/login', {username:username, password:password}).then(res => {
            setToken(res.data.accessToken);
            setUser(username);
        }).catch(err => {
            console.log("There was an error");
        })
    }
    */

    const handleLogin = e => {
        setUser(username);
    }

    const handleLogout = e => {
        console.log("Log out");
    }

    //<TextField label="Password" value={getDots(password)} onChange={handlePasswordChange} />
    return (
        <div id="loginWrapper">
            <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <Button variant="contained" color="primary" onClick={token !== null ? handleLogout : handleLogin}>{token !== null ? "Log out" : "Log in"}</Button>
        </div>
    )
}

export default Login;