import React, { useContext, useEffect, useState } from 'react'

import { ExerciseContext } from '../../context/ExerciseState'

import '../../css/Profile/UserOneRepMax.css';

const OneRepMax = () => {

    const { exercises } = useContext(ExerciseContext);
    
    /*
        title: 1RM,
        date: date
        exercise: exercise.name
        value: 1RM calc

        calculation:
            a = repsToFailure * 2.5
            b = 100 - a (determines % of 1RM)
            c = b / 100 (yields the decimal value of 1RM)
            d = weightLifted / c (yields estimated 1RM)

    */
    const [ oneRM, setOneRM ] = useState({})

    const getOneRepMax = () => {
        const result = exercises.map(e => ({name: e.name, date: e.date, oneRepMax: calculateOneRepMax(e.reps, e.weight)}));
        const resultObj = result.reduceRight(
            (previousValue, currentValue) => (previousValue.oneRepMax > currentValue.oneRepMax ? previousValue : currentValue)
        );
        setOneRM(resultObj);
    }

    const calculateOneRepMax = (reps, weight) => {
        const a = reps * 2.5;
        const percentOfOneRepMax = 100 - a;
        const decimalOfOneRepMax = percentOfOneRepMax / 100;
        const estOneRepMax = weight / decimalOfOneRepMax;
        return estOneRepMax;
    }

    useEffect(() => {
        getOneRepMax();
    }, [])
    

    return (
    <>
        <div className="metric-container">
            <div className="metric-title">
                Estimated 1RM
            </div>
            <div className="metric-value">
                <p className="metric-value-name">{oneRM.name}</p>
                <p className="metric-value-value">{oneRM.oneRepMax !== undefined ? oneRM.oneRepMax.toFixed(0) + ' lbs': ''}</p>
                <p className="metric-value-date">{oneRM.date}</p>
            </div>
        </div>
    </>
  )
}

export default OneRepMax