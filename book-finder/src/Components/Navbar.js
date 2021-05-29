import {Link} from 'react-router-dom';

const Navbar = props => {
    return (
        <div id="navbar">
            <div className="nav">
                <li style={{fontFamily:"'Nanum Gothic', sans-serif"}}><Link to="/">Home</Link></li>
            </div>
            <div className="nav">
                <li style={{fontFamily:"'Nanum Gothic', sans-serif"}}><Link to="/library">Library</Link></li>
            </div>
            <div className="nav">
                <li style={{fontFamily:"'Nanum Gothic', sans-serif"}}><Link to="/login">Log in</Link></li>
            </div>
        </div>
    )
}

export default Navbar;