import React, { useEffect } from 'react'


const ProfileCalcStats = () => {
  
    const [ exercises, setExercises ] = useState([]);
    const [ bmi, setBmi ] = useState();

    const getExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }

    const determineUserHighestOneRepMax = () => {
        
    }

    useEffect(() => {
        getExercises();
    }, [])

    return (
      <>
        <div>ProfileCalcStats</div>
      </>
  )
}

export default ProfileCalcStats