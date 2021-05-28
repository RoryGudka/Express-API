import {useState, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {UserContext} from '../Contexts/UserContextProvider';

const useStyles = makeStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline': {
            borderBottomColor: 'white',
        },
    },
    input: {
        color:"white",
        borderColor:"white"
    },
    label: {
        color:"lightgrey",
    }
});

const Login = props => {
    const classes = useStyles();
    const {user, setUser} = useContext(UserContext);
    const [username, setUsername] = useState(user);

    const handleLogin = e => {
        setUser(username);
    }

    return (
        <div id="loginWrapper">
            <p style={{position:"absolute", color:"white", top:"-13px", fontSize:"18px", fontFamily:"'Nanum Gothic', sans-serif",}}>Username: </p>
            <TextField style={{right:"10px"}} className={classes.root} inputProps={{className:classes.input}} InputLabelProps={{className:classes.label}} value={username} onChange={e => setUsername(e.target.value)} />
            <Button variant="contained" color="primary" onClick={handleLogin}>Log in</Button>
        </div>
    )
}

export default Login;