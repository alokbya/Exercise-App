import React from 'react';
import { useHistory } from 'react-router-dom';
import {MdModeEdit, MdDelete} from 'react-icons/md';

function Exercise ({ exercise, deleteExercise, onEdit }) {

    return (
        <tr>
            <td class="name"> { exercise.name } </td>
            <td class="number"> { exercise.reps } </td>
            <td class="number"> { exercise.weight } </td>
            <td> { exercise.unit } </td>
            <td> { exercise.date } </td>
            <td title='Edit this exercise' class="link edit-link" onClick={() => onEdit(exercise)}> <MdModeEdit /> </td>
            <td title="Delete this exercise" class="link delete-link" onClick={() => deleteExercise(exercise._id)}> <MdDelete /> </td>
        </tr>
    );
}

export default Exercise;