import {Link} from 'react-router-dom';
import Login from './Login';

const Navbar = props => {
    return (
        <div id="navbar">
            <div className="nav">
                <li style={{fontFamily:"'Nanum Gothic', sans-serif"}}><Link to="/">Home</Link></li>
                <div className="opaque"></div>
            </div>
            <div className="nav">
                <li style={{fontFamily:"'Nanum Gothic', sans-serif"}}><Link to="/library">Library</Link></li>
                <div className="opaque"></div>
            </div>
            <Login />
        </div>
    )
}

export default Navbar;