import React, {useContext, useEffect, useState} from 'react'
import ProfileMainStatsPopup from './ProfileMainStatsPopup';
import { convertLbsToKg, convertKgToLbs, convertInToFtIn } from '../../helpers/conversions.mjs'

import {FaEdit} from 'react-icons/fa';
import {ImPlus} from 'react-icons/im'

import { ProfileContext } from '../../context/ProfileState';

import '../../css/Loading.css';
import '../../css/Profile/ProfileMainStats.css'

function ProfileMainStats() {
    const [ userWeight, setUserWeight ] = useState({});
    const [ userHeight, setUserHeight ] = useState();
    const [ profileLoading, setProfileLoading ] = useState(true);
    const [ displayPopup, setDisplayPopup ] = useState(false);
    const [ addedStats, setAddedStats ] = useState(false);

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

    const scrubData = async (userObj) => {
        const weight_valid = await scrubWeight(userObj.weight);
        const height_valid = await scrubHeight(userObj.height)
        if (weight_valid && height_valid) {
            setAddedStats(true);
        } else {
            setAddedStats(false);
        }
    }

    const scrubWeight = async (weightObj) => {
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
        if(w.weight_lbs === -1) {
            return false;
        }
        return true;
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
        if (h.height_in === -1) {
            return false;
        }
        return true;
    }

    /******************************
        * Get User Profile (GET)
    ******************************/

    const getProfileInfo = async () => {
        setProfileLoading(true);
        const response = await fetch('/users/profile');
        if (response.status === 200) {
            const obj = await response.json();
            await scrubData(obj);
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
                    {addedStats ? <div className="height-weight-container added">
                        <div className="user-weight profile-bio-stat">
                            <section className="weight-value">
                                {userWeight.weight_lbs > -1 ? `${userWeight.weight_lbs} lbs` : ''}
                            </section>
                            <section className="weight-date-added">
                                {Object.keys(userWeight.weight_obj).length === 0 ? '' : `added on ${userWeight.weight_obj.date.toString().slice(0, 10)}`}
                            </section>
                        </div>
                        <div className="user-height profile-bio-stat">
                            <section className="height-value">
                                {userHeight.height_in_total > -1 ? `${userHeight.height_ft}' ${userHeight.height_in}"` : ''}
                            </section>
                            <section className="height-date-added">
                                {Object.keys(userHeight.height_obj).length === 0 ? '' : `added on ${userHeight.height_obj.date.toString().slice(0, 10)}`}
                            </section>
                        </div>
                        <div className="open-popup-btn" onClick={openPopup}><FaEdit className="edit-icon"/></div>
                    </div> : <div onClick={openPopup} className="height-weight-container not-added"><ImPlus className="first-edit-icon"/><p className="first-add-height-weight-text">Log height & weight</p></div> }
                
                <ProfileMainStatsPopup displayPopup={displayPopup} setDisplayPopup={setDisplayPopup}
                    userWeight={userWeight}
                    userHeight={userHeight}
                    getProfileInfo={getProfileInfo}
                    setAddedStats={setAddedStats}
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