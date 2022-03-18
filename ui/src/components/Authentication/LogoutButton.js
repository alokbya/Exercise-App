import React from 'react';
import { useHistory } from 'react-router';

function LogoutButton({loggedIn, setLoggedIn}) {
    
    const history = useHistory();

    const logoutUser = async () => {
        const response = await fetch('/auth/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            setLoggedIn(false);
            history.push('/login');
        }
    }

    return (
        <>
            <button className="logout-button" onClick={logoutUser}>Logout</button>
        </>
    );
}

export default LogoutButton;