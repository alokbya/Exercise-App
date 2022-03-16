import React from 'react'
import UserBmi from './UserBmi';

import '../../css/Profile/ProfileKeyMetrics.css'

const ProfileKeyMetrics = () => {
  return (
    <>
        <div className="profile-key-metrics-container">
            <UserBmi />
        </div>
    </>
  )
}

export default ProfileKeyMetrics