import './Styles/App.css';
import {useState, useContext} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {UserContext} from '../Contexts/UserContextProvider';

const Login = props => {
    const {user, setUser} = useContext(UserContext);
    const [username, setUsername] = useState(user !== undefined ? user.uid : "");
    const [password, setPassword] = useState("");
    const token = user !== undefined ? user.token : undefined;

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

    const handleSignup = () => {
        axios.post('http://localhost:3001/signup', {username:username, password:password}).then(res => {
            if(res.data.status === 200) {
                setUser({
                    uid:username,
                    token:res.data.token
                });
            }
            else alert(res.data.message);
        }).catch(err => {
            alert("There was an error");
        });
    }

    const handleLogin = e => {
        axios.post('http://localhost:3001/login', {username:username, password:password}).then(res => {
            if(res.data.status === 200) {
                setUser({
                    uid:username,
                    token:res.data.token
                });
            }
            else alert(res.data.message);
        }).catch(err => {
            alert("There was an error");
        });
    }

    const handleLogout = e => {
        setUser(undefined);
    }

    return (
        <div id="signinWrapper">
            <Paper style={{display:"inline-block", width:"35%", margin:"40px 0", padding:"15px 5px"}} elevation={3}>
                <div className="use-passWrapper">
                    <TextField fullWidth label="Username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <br></br>
                <div className="use-passWrapper">
                    <TextField fullWidth label="Password" value={getDots(password)} onChange={handlePasswordChange} />
                </div>
                <div id="loginBtnWrapper">
                    {token === undefined && <Button variant="contained" color="primary" onClick={handleSignup}>Sign up</Button>}
                    <Button style={{marginLeft:"20px"}} variant="contained" color="primary" onClick={token !== undefined ? handleLogout : handleLogin}>{token !== undefined ? "Log out" : "Log in"}</Button>
                </div>
            </Paper>
        </div>
    )
}

export default Login;