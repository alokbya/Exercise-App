import React from 'react'

// CSS
import '../../css/Icon.css';

const UserIcon = () => {
  return (
      <>
        <div className="user-profile-icon-container">
            <img class="user-profile-icon" src={process.env.PUBLIC_URL + '/barbell-bench-press.png'} alt="Default User Icon"/>
        </div>
    
      </>    
  );
}

export default UserIcon