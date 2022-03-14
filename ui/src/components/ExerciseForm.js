import React from 'react'

function ExerciseForm({name, setName,
                    reps, setReps,
                    weight, setWeight,
                    unit, setUnit,
                    date, setDate}) {
    return (
        <>
            <section id="exercise-form">    
                <label for="name">Name</label>
                <input 
                    type="text"
                    placeholder="Enter exercise name"
                    value={name}
                    id="name"
                    onChange={e => setName(e.target.value)} 
                />
                <label for="reps">Reps</label>
                <input
                    type="number"
                    placeholder="Enter exercise set reps"
                    value={reps}
                    id="reps"
                    class="number-input"
                    onChange={e => setReps(e.target.value)}
                />
                <label for="weight">Weight</label>
                <section id="weight-unit">
                    <input
                        type="number"
                        placeholder="Enter weight"
                        value={weight}
                        id="weight"
                        class="number-input"
                        onChange={e => setWeight(e.target.value)}
                    />
                    <select name="unit" id="unit" value={unit} onChange={e => setUnit(e.target.value)}>
                        <option>lbs</option>
                        <option>kg</option>
                    </select>
                </section>
                
                <label for="date">Date</label>
                <input
                    type="string"
                    id="date"
                    placeholder="Enter exercise date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </section>
        </>
    );
}
export default ExerciseForm;