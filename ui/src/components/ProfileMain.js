import React, { useEffect, useState } from 'react'

/*
    * Main component of the profile
    * Includes user information
*/
function ProfileMain() {

    const [ user, setUser ] = useState([]);
    const [ userLoading, setUserLoading ] = useState(true);

    const getUserInfo = async () => {
        setUserLoading(true);
        const response = await fetch('/users/me');
        if (response.status === 200) {
            const obj = await response.json();
            const newUser = obj[0];
            setUser(newUser);
        } else {

        }
        setUserLoading(false);
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    if (!userLoading) {
        return (
            <>
                <p>Profile header</p>
                <p>{user.first_name[0].toString().toUpperCase() + user.first_name.substring(1)}</p>
                <p>{user.last_name[0].toString().toUpperCase() + user.last_name.substring(1)}</p>
                <p>{user.email}</p>

            </>
        );
    } else {
        return (
            <div class="loader"></div>
        );
    }
}

export default ProfileMain;