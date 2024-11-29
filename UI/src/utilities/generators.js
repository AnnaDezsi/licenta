export const createIncrementalArray = (minValue, maxValue) => {
    if ((minValue > maxValue) || (typeof minValue !== "number") || (typeof maxValue !== "number")) {
        throw Error("Min value must be lower than max value and it must be a number")
    }

    const arrayOfObjects = [];
    for (let value = minValue; value <= maxValue; value++) {
        arrayOfObjects.push({ value });
    }
    return arrayOfObjects;
}


