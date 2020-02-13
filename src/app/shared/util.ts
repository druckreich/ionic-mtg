import {Answer} from "src/app/quiz/quiz-questions/quiz-question.model";

export function getRandomElementsFrom(arr, n) {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

export function cardValueToAnswer(value: any, correct: boolean): Answer {
    return {
        value: value,
        correct: correct,
        selected: false,
        state: correct ? 'true' : 'false'
    }
}
