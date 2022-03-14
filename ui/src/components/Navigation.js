import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton';

function Navigation({loggedIn, setLoggedIn}) {
    
    if (loggedIn){
        return (
            <>
                <nav>
                    <Link id="home-link" class="nav-item" to='/' exact>Home</Link>
                    <Link to="/create-exercise">Create Exercise</Link>
                    <LogoutButton loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    {/* <Link id="create-link" class="nav-item" to='/create-exercise'>Create Exercise</Link> */}
                    {/* <Link to='/edit-exercise'>Edit Exercise</Link> */}
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