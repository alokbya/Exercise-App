import React, { useContext, useEffect, useState } from 'react'
import UserBmi from './UserBmi';
import OneRepMax from './OneRepMax';
import '../../css/Profile/ProfileKeyMetrics.css'

import { ProfileContext } from '../../context/ProfileState';

const ProfileKeyMetrics = () => {
  const { profile } = useContext(ProfileContext);

  const [ invalidStats, setInvalidStats ] = useState(true);


  useEffect(() => {
    if (profile.height_in === undefined || profile.height_in.toString() === '-1') {
      setInvalidStats(true);
    } else {
      setInvalidStats(false);
    }
  });

  if (invalidStats) {
    return (
      <div className="undefined-stats">

      </div>
    );
  } else {
    return (
      <>
          <div className="profile-key-metrics-container">
              <UserBmi />
              <OneRepMax />
          </div>
      </>
    );
  }
}

export default ProfileKeyMetrics