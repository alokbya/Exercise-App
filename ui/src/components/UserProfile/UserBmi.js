import React, { useState, useEffect, useContext } from 'react'

import { ProfileContext } from '../../context/ProfileState';

import '../../css/Profile/UserBmi.css';

/*
  * BMI Formula:
  * weight(lb) / [height(in)*height(in)] * 703
*/
const UserBmi = () => {
    
  const {profile} = useContext(ProfileContext);

  return (
    <>
      <div className="bmi-container">
        <div className="metric-title">
          BMI
        </div>
        <div className="metric-value">
          {(profile.weight_lbs / (Math.pow(profile.height_in, 2)) * 703).toFixed(1).toString()}
        </div>
      </div>
    
    </>
  )
}

export default UserBmi;