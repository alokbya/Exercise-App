const convertLbsToKg = (lbs) => {
    return Math.floor(parseFloat(lbs)*0.453592);
}

const convertKgToLbs = (kg) => {
    return Math.floor(parseFloat(kg)*2.20462);
}

const convertInToFtIn = (inches) => {
    if (inches === undefined) return
    const inputInches = parseFloat(inches);
    const formalHeight = {feet: Math.floor(inputInches / 12), inches: inputInches % 12};
    return formalHeight;
}

export { convertLbsToKg, convertKgToLbs, convertInToFtIn };