import React, {useState} from 'react';
import { useHistory } from 'react-router';
import ExerciseForm from '../components/Exercise/ExerciseForm';

function EditExercisePage({exercise}) {
    
    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date);
    
    let history = useHistory();

    const editExercise = async () => {
        const updatedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            console.log('Successfully edited exercise');
        } else {
            console.log(`Failed to edit exercise, status code = ${response.status}`);
        }
        history.push('/');
    }

    return (
        <>
            <h2>Edit Exercise</h2>
            <ExerciseForm name={name} setName={setName}
                    reps={reps} setReps={setReps}
                    weight={weight} setWeight={setWeight}
                    unit={unit} setUnit={setUnit}
                    date={date} setDate={setDate} /> 
            <button id="submit-exercise" onClick={editExercise}>Edit</button>
        </>
    )
}

export default EditExercisePage;