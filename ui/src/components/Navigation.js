import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './Authentication/LogoutButton';

function Navigation({loggedIn, setLoggedIn}) {
    
    if (loggedIn){
        return (
            <>
                <nav>
                    <Link id="home-link" className="nav-item" to='/' exact>Home</Link>
                    <Link to="/create-exercise">Create Exercise</Link>
                    <Link to="/profile">User Profile</Link>
                    <LogoutButton loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                </nav>
            </>
        );
    } else {
        return (
            // Don't show nav bar if the user is not logged in
            <>
            </>
        )
    }

    
}
export default Navigation;