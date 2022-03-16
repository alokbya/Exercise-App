import React from 'react'
import { useHistory } from 'react-router';
import ProfileKeyMetrics from '../components/UserProfile/ProfileKeyMetrics';
import ProfileMain from '../components/UserProfile/ProfileMain';
import ProfileMainStats from '../components/UserProfile/ProfileMainStats';

import { ProfileProvider } from '../context/ProfileState';

function UserProfilePage({loggedIn}) {
    const history = useHistory();
    if (!loggedIn) {
        history.push('/login');
    }

    return (
        <>
            <ProfileProvider >
                <ProfileMain />
                <ProfileMainStats />
                <ProfileKeyMetrics />
            </ProfileProvider>
        </>
    );
}

export default UserProfilePage;