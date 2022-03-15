import React, {useEffect, useState} from 'react'
import ProfileMainStatsPopup from './ProfileMainStatsPopup';
import { convertLbsToKg, convertKgToLbs, convertInToFtIn } from '../helpers/conversions.mjs'

function ProfileMainStats() {
    const [ profile, setProfile ] = useState([]);
    const [ userWeight, setUserWeight ] = useState();
    const [ userWeightVal, setUserWeightVal ] = useState();
    const [ userHeight, setUserHeight ] = useState();
    const [ userHeightVal, setUserHeightVal ] = useState();
    const [ userHeightFt, setUserHeightFt ] = useState();
    const [ userHeightIn, setUserHeightIn ] = useState();
    const [ profileLoading, setProfileLoading ] = useState(true);
    const [ displayPopup, setDisplayPopup ] = useState(false);

    const cleanHeight = async (height_in) => {
        const height = convertInToFtIn(height_in);
        setUserHeightFt(height.feet);
        setUserHeightIn(height.inches);
    }

    const updateHeightFt = (ft) => {
        setUserHeightFt(ft);
        setUserHeightVal(parseInt(userHeightFt)*12 + parseInt(userHeightIn));
    }

    const updateHeightIn = (inches) => {
        setUserHeightIn(inches);
        setUserHeightVal(parseInt(userHeightFt)*12 + parseInt(userHeightIn));
    }

    const cleanWeight = async (weight) => {
        setUserWeight(weight);
        setUserWeightVal(weight.weight_lbs);
    }

    const getProfileInfo = async () => {
        setProfileLoading(true);
        const response = await fetch('/users/profile');
        if (response.status === 200) {
            const obj = await response.json();
            if (obj.height !== undefined) {
                await setUserHeight(obj.height);
                await cleanHeight(obj.height.height_in);
            } else setUserHeight('nothing');
            if (obj.weight !== undefined) await cleanWeight(obj.weight);
            else setUserWeight('nothing');
        } else {

        }
        setProfileLoading(false);
    }

    const showDisplay = () => {
        setDisplayPopup(true);
    }

    useEffect(() => {
        getProfileInfo();
    }, []);

    if (!profileLoading) {
        return (
            <>
                <p>{userWeight.weight_lbs} lbs</p>
                <p>{userHeightFt.toString()} ft {userHeightIn.toString()} in</p>
                {/* <p>{userWeight.weight_lbs}</p>
                <p>{userHeight.height_in}</p> */}
                <button onClick={showDisplay}>Log</button>
                <ProfileMainStatsPopup displayPopup={displayPopup} setDisplayPopup={setDisplayPopup}
                    userWeight={userWeight} setUserWeight={setUserWeight}
                    userWeightVal={userWeightVal} setUserWeightVal={setUserWeightVal}
                    userHeight={userHeight} setUserHeight={setUserHeight}
                    userHeightIn={userHeightIn} setUserHeightIn={setUserHeightIn}
                    userHeightFt={userHeightFt} setUserHeightFt={setUserHeightFt}
                    userHeightVal={userHeightVal} setUserHeightVal={setUserHeightVal}
                    getProfileInfo={getProfileInfo} updateHeightFt={updateHeightFt}
                    updateHeightIn={updateHeightIn} cleanUpdateWeight={cleanWeight}
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