import React, {useContext, useEffect, useState} from 'react'
import ProfileMainStatsPopup from './ProfileMainStatsPopup';
import { convertLbsToKg, convertKgToLbs, convertInToFtIn } from '../../helpers/conversions.mjs'

import {FaEdit} from 'react-icons/fa';

import { ProfileContext } from '../../context/ProfileState';

import '../../css/Loading.css';
import '../../css/ProfileMainStats.css'

function ProfileMainStats() {
    const [ userWeight, setUserWeight ] = useState({});
    const [ userHeight, setUserHeight ] = useState();
    const [ profileLoading, setProfileLoading ] = useState(true);
    const [ displayPopup, setDisplayPopup ] = useState(false);

    const { profile, updateUserWeight, updateUserHeight } = useContext(ProfileContext);

    /**************************
        * Manage Popup State
    **************************/

    const openPopup = () => {
        setDisplayPopup(true);
    }

    /****************************
        * Scrub (clean) Inputs
    ****************************/

    const scrubWeight = (weightObj) => {
        const w = {}
        if (weightObj === undefined) {
            w.weight_obj = {};
            w.weight_lbs = -1;            
        } else {
            w.weight_obj = weightObj;
            w.weight_lbs = weightObj.weight_lbs;
        }
        setUserWeight(w);
        updateUserWeight(w.weight_lbs);
    }

    const scrubHeight = async (heightObj) => {
        const h = {};
        if (heightObj === undefined) {
            h.height_obj = {};
            h.height_ft = -1;
            h.height_in = -1;
            h.height_in_total = -1;
        } else {
            h.height_obj = heightObj;
            const cleanedHeight = convertInToFtIn(heightObj.height_in);
            h.height_ft = cleanedHeight.feet;
            h.height_in = cleanedHeight.inches;
            h.height_in_total = heightObj.height_in;
        }
        setUserHeight(h);
        updateUserHeight(h.height_in_total);
    }

    /******************************
        * Get User Profile (GET)
    ******************************/

    const getProfileInfo = async () => {
        setProfileLoading(true);
        const response = await fetch('/users/profile');
        if (response.status === 200) {
            const obj = await response.json();
            scrubWeight(obj.weight);
            await scrubHeight(obj.height);
        } else {
        }
        setProfileLoading(false);
    }

    /************************
        * Lifecycle Hooks
    ************************/

    useEffect(() => {
        getProfileInfo();
    }, []);

    /***********************
        * Render Content
    ***********************/

    if (!profileLoading) {
        return (
            <>
                <div id="profile-stats">
                    <div id="user-weight">
                        <section id="weight-value">
                            {userWeight.weight_lbs > -1 ? `${userWeight.weight_lbs} lbs` : ''}
                        </section>
                        <section id="weight-date-added">
                            {Object.keys(userWeight.weight_obj).length === 0 ? '' : `added on ${userWeight.weight_obj.date.toString().slice(0, 10)}`}
                        </section>
                    </div>
                    <div id="user-height">
                        <section id="height-value">
                            {userHeight.height_in_total > -1 ? `${userHeight.height_ft}' ${userHeight.height_in}"` : ''}
                        </section>
                        <section id="height-date-added">
                            {Object.keys(userHeight.height_obj).length === 0 ? '' : `added on ${userHeight.height_obj.date.toString().slice(0, 10)}`}
                        </section>
                    </div>
                    <div id="open-popup-btn" onClick={openPopup}><FaEdit id="edit-icon"/></div>
                </div>
                {/* <p>{userWeight.weight_lbs}</p>
                <p>{userHeight.height_in}</p> */}
                
                <ProfileMainStatsPopup displayPopup={displayPopup} setDisplayPopup={setDisplayPopup}
                    userWeight={userWeight}
                    userHeight={userHeight}
                    getProfileInfo={getProfileInfo}
                />
            </>
        );
    } else {
        return (
            <div class="loader"></div>
        );
    }
}

export default ProfileMainStats;