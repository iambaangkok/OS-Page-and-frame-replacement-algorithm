function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const generateReferenceString = (count: number, max: number) => {
    const referenceString: number[] = [];

    for (let i = 0; i < count; ++i) {
        const randomed = getRandomInt(0, max);

        referenceString.push(randomed);
    }

    return referenceString;
};

const generateReferenceStringCustom = (
    count: number,
    max: number,
    percent: number
) => {
    const referenceString: number[] = [];

    for (let i = 0; i < count; ++i) {
        const randomed1 = getRandomInt(0, max / 2);
        const randomed2 = getRandomInt(max / 2, max);

        const randPick = getRandomInt(0, 100);

        if (randPick < percent) {
            referenceString.push(randomed1);
        } else {
            referenceString.push(randomed2);
        }
    }

    return referenceString;
};

const upperBound = 16;
const percentage = 67;

console.log(
    generateReferenceStringCustom(30, upperBound, percentage).toString()
);
console.log(
    generateReferenceStringCustom(50, upperBound, percentage).toString()
);
console.log(
    generateReferenceStringCustom(100, upperBound, percentage).toString()
);

export const referenceString30 = [
    8, 0, 2, 12, 1, 6, 12, 6, 3, 0, 2, 9, 6, 12, 7, 2, 15, 10, 5, 3, 3, 3, 10,
    11, 6, 6, 5, 15, 8, 5,
];
export const referenceString50 = [
    8, 6, 12, 2, 6, 14, 2, 14, 10, 4, 7, 5, 12, 2, 6, 12, 15, 7, 4, 6, 3, 10,
    14, 1, 7, 11, 7, 0, 4, 7, 4, 9, 7, 6, 6, 11, 13, 12, 15, 1, 1, 0, 15, 4, 6,
    0, 5, 2, 3, 4,
];
export const referenceString100 = [
    0, 0, 7, 12, 7, 4, 6, 4, 6, 0, 14, 2, 4, 8, 15, 0, 3, 15, 7, 2, 9, 14, 5, 3,
    1, 6, 1, 1, 7, 3, 2, 3, 11, 11, 4, 6, 13, 12, 12, 3, 11, 8, 9, 3, 10, 13, 6,
    2, 3, 6, 4, 5, 6, 15, 2, 5, 12, 15, 0, 4, 10, 1, 10, 4, 1, 1, 7, 7, 2, 0, 1,
    14, 7, 4, 2, 1, 5, 2, 13, 0, 0, 1, 5, 9, 12, 5, 2, 6, 1, 6, 15, 2, 4, 4, 4,
    1, 4, 0, 7, 3,
];
