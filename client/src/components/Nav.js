import {NavLink} from 'react-router-dom'
import '../styles/Nav.css';

const Nav = () => {
    return (
        <header>
            <nav>
                <NavLink to="/register">
                <h3>Sign Up</h3>
                </NavLink>
                <NavLink to="/login">
                <h3>Sign In</h3>
                </NavLink>
                <h1><a href='/'>Plants</a></h1>
            </nav>
        </header>
    )
}

export default Nav;