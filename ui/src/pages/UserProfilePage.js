import React from 'react'
import { useHistory } from 'react-router';
import ProfileMain from '../components/ProfileMain';
import ProfileMainStats from '../components/ProfileMainStats';
import ProfileMainStatsPopup from '../components/ProfileMainStatsPopup';

function UserProfilePage({loggedIn}) {
    const history = useHistory();
    if (!loggedIn) {
        history.push('/login');
    }

    return (
        <>
            <h2>User Profile</h2>
            <ProfileMain />
            <ProfileMainStats />
        </>
    );
}

export default UserProfilePage;