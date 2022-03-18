import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseForm from '../components/Exercise/ExerciseForm';

function CreateExercisePage({loggedIn}) {

    const [name, setName] = useState('');
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState("lbs");
    const [date, setDate] = useState('');

    let history = useHistory();
    if (!loggedIn) {
        history.push('/login');
    }
    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date: date.toString().replace('/','-')};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            console.log('Successfully added the exercise!');
        } else {
            console.log(`Failed to add movie, status code = ${response.status}`);
        }
        history.push('/');
    }

    return (
        <>
            <h2>Create Exercise</h2>
            <ExerciseForm name={name} setName={setName}
                    reps={reps} setReps={setReps}
                    weight={weight} setWeight={setWeight}
                    unit={unit} setUnit={setUnit}
                    date={date} setDate={setDate}/> 
            <button id="submit-exercise" onClick={createExercise}>Add</button>
        </>
        
    )
}

export default CreateExercisePage;