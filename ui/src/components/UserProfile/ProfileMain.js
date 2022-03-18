import React, { useEffect, useState, useContext } from 'react'
import UserIcon from './UserIcon';

// import profile context
import { ProfileContext } from '../../context/ProfileState';

// CSS
import '../../css/Profile/ProfileMain.css';

/*
    * Main component of the profile
    * Includes user information
*/
function ProfileMain() {

    const { profile, updateUserFirstName, updateUserLastName, updateUserEmail } = useContext(ProfileContext);

    const [ loading, setLoading ] = useState(true);

    const getUserInfo = async () => {
        setLoading(true);
        const response = await fetch('/users/me');
        if (response.status === 200) {
            const obj = await response.json();
            const newUser = obj[0];
            updateUserFirstName(newUser.first_name);
            updateUserLastName(newUser.last_name);
            updateUserEmail(newUser.email);
        } else {

        }
        setLoading(false);
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    if (!loading) {
        return (
            <>
                <UserIcon />
                <div className="profile-main-container">
                    <div className="profile-main-names">
                        <p id="profile-main-first-name">{profile.first_name[0].toString().toUpperCase() + profile.first_name.substring(1)}</p>
                        <p id="profile-main-last-name">{profile.last_name[0].toString().toUpperCase() + profile.last_name.substring(1)}</p>
                    </div>
                    <div className="profile-main-email-container">
                        <p id="profile-main-email">{profile.email}</p>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div class="loader"></div>
        );
    }
}

export default ProfileMain;