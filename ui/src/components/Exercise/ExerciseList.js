import React from 'react';
import Exercise from './Exercise';

function ExerciseList ({ exercises, deleteExercise, setExerciseToEdit, onEdit }) {
    
    return (
        <>
            <table id="exercises-table">
                <thead>
                    <tr>
                        <th className="reg-header name">Name</th>
                        <th className="reg-header">Reps</th>
                        <th className="reg-header">Weight</th>
                        <th className="reg-header">Unit</th>
                        <th className="reg-header date">Date</th>
                        <th id="edit-header"></th>
                        <th id="delete-header"></th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, i) => <Exercise exercise={exercise}
                        key={i}
                        deleteExercise={deleteExercise}
                        onEdit={onEdit} />)}
                </tbody>
            </table>
        </>
    );
}

export default ExerciseList;