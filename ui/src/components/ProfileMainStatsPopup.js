import React, {useState} from 'react'

import '../css/Popup.css';
import '../css/Loading.css';

function ProfileMainStatsPopup({displayPopup, setDisplayPopup, 
  userWeight, userHeight,
  getProfileInfo}) {

  const [ localWeight, setLocalWeight ] = useState((userWeight.weight_lbs > -1 ? userWeight.weight_lbs : '230'));
  const [ localHeightIn, setLocalHeightIn ] = useState((userHeight.height_in > -1 ? userHeight.height_in : '11'));
  const [ localHeightFt, setLocalHeightFt ] = useState((userHeight.height_ft > -1 ? userHeight.height_ft : '5'));

  const limits = {
    weight_min: 0,
    weight_max: 700,
    heightFt_min: 4,
    heightFt_max: 8,
    heightIn_min: 0,
    heightIn_max: 11
  };

  /***********************
    * Manage Popup State
  ***********************/

  const closePopup = () => {
    setLocalWeight((userWeight.weight_lbs > -1 ? userWeight.weight_lbs : '230'));
    setLocalHeightIn()
    setDisplayPopup(false);
  }

  /*****************
    * Clean Inputs
  *****************/

  const cleanInput = (input, oldVal) => {
    if (input.length > 1 && input[0] !== "0" || input.length === 1 || input === '') return input;
    return oldVal;
  }

  const cleanWeight = (w) => {
    const weight = cleanInput(w, localWeight);
    const pWeight = parseInt(weight);
    if (pWeight >= limits.weight_min && pWeight <= limits.weight_max) setLocalWeight(pWeight.toString());
  }

  const cleanHeightFt = (hf) => {
    const heightFt = cleanInput(hf, localHeightFt);
    const pHeightFt = parseInt(heightFt);
    if (pHeightFt >= limits.heightFt_min && pHeightFt <= limits.heightFt_max) setLocalHeightFt(pHeightFt.toString());
    else if (pHeightFt < limits.heightFt_min) setLocalHeightFt(limits.heightFt_min.toString());
    else if (pHeightFt > limits.heightFt_max) setLocalHeightFt(limits.heightFt_max.toString());
  }

  const cleanHeightIn = (hi) => {
    const heightIn = cleanInput(hi, localHeightIn);
    const pHeightIn = parseInt(heightIn);
    if (pHeightIn >= limits.heightIn_min && pHeightIn <= limits.heightIn_max) setLocalHeightIn(pHeightIn.toString());
  }

  /*******************************
    * Update User Profile (PUT)
  *******************************/

  const updateUserProfile = async () => {
    const height_combined = parseInt(localHeightFt)*12 + parseInt(localHeightIn);
    const update = { weight_lbs: localWeight, height_in: height_combined };
    const response = await fetch('users/profile', {
      method: 'PUT',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      getProfileInfo();
      closePopup();
    }
  }

  /***********************
        * Render Content
  ***********************/

  return (displayPopup) ? (
    <div className="popup">
        <div className="popup-inner">
          <div className="popup-content">
            <div id="popup-weight" className="popup-group">
              <label className="popup-title" id="weight-title" for="popup-weight-lbs">Weight</label>
              <div id="popup-weight-inputs">
                <input
                  className="popup-input"
                  id="popup-weight-lbs"
                  type="number"
                  value={localWeight}
                  min={limits.weight_min}
                  max={limits.weight_max}
                  onChange={e => cleanWeight(e.target.value)}
                  />
                  <label className="popup-label" id="in-label" for="popup-weight-lbs">lbs</label>
              </div>
            </div>
            <div id="popup-height" className="popup-group">
              <label className="popup-title" id="height-title" for="popup-height-input">Height</label>
              <div id="popup-height-inputs">
                  <input
                  min={limits.heightFt_min}
                  max={limits.heightFt_max}
                  className="popup-input"
                  id="popup-height-ft"
                  type="number"
                  value={localHeightFt}
                  onChange={e => cleanHeightFt(e.target.value)}
                  />
                  <label className="popup-label" id="ft-label" for="popup-height-ft">ft</label>
                  <input
                  min={limits.heightIn_min}
                  max={limits.heightIn_max}
                  className="popup-input"
                  id="popup-height-in"
                  type="number"
                  value={localHeightIn}
                  onChange={e => cleanHeightIn(e.target.value)}
                  /><label className="popup-label" id="in-label" for="popup-height-in">in</label>
              </div>
            </div>
          </div>            
          <div className="popup-btns">
            <button id="popup-update" className="popup-btn" onClick={updateUserProfile}>Update</button>
            <button id="popup-close" className="popup-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
    </div>  
  ) : ""
}

export default ProfileMainStatsPopup;