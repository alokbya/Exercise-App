import React from 'react';
import ExerciseList from '../components/ExerciseList';

import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function HomePage({setExerciseToEdit, loggedIn}) {
    const [exercises, setExercises] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const history = useHistory();

    const getExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
        setIsLoading(false);
    }

    const deleteExercise = async (id) => {
        const response = await fetch(`/exercises/${id}`, {
            method: 'DELETE',
        });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with id = ${id}, status code = ${response.status}`);
        }
    }

    const onEdit = (exercise) => {
        setIsLoading(true);
        setExerciseToEdit(exercise)
        history.push('/edit-exercise');
    }

    useEffect(() => {
        if (!loggedIn) {
            history.push('/login');
        }
        else {
            setIsLoading(true);
            getExercises();
        }
    }, []);

    if (isLoading) {
        return (
            <div class="loader"></div>
        )
    }
    else if (!isLoading && exercises.length === 0) {
        return (
            <>
                <section>
                    <p id="no-exercises">It looks like you haven't added any exercises yet. <Link to="/create-exercise">Create new exercises</Link> to see them here.</p>
                </section>
            </>
        );
    } else {
        return (
            <>
                <ExerciseList exercises={exercises} 
                deleteExercise={deleteExercise}
                onEdit={onEdit} />
            </>
        );
    }
        
}

export default HomePage;