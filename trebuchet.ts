import assert from "node:assert"
import { readFileSync } from "node:fs"
import path from "node:path"

type NP = {
    index: number,
    numInWords: string
}

type NumbersMap = {
    [key: string]: number
}

let numbers_map: NumbersMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
}

let arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

let matchElements = (el: string) => {
    let numberOfIndex = -1;
    const numbers_positions: NP[] = arr.reduce((acc: NP[], item) => {
        while ((numberOfIndex = el.indexOf(item, numberOfIndex + 1)) !== -1) {
            acc.push({ index: numberOfIndex, numInWords: item });
        }
        return acc
    }, [])

    let sortedPositions = numbers_positions.sort((a, b) => a.index - b.index)

    const { numInWords: first } = sortedPositions[0];
    const { numInWords: last } = sortedPositions[sortedPositions.length - 1];

    let first_char = first
    let last_char = last

    if (isNaN(Number(first))) first_char = String(numbers_map[first]);
    if (isNaN(Number(last))) last_char = String(numbers_map[last]);

    return first_char + last_char;
}

const trebuchet = (str: string) => str
    .split(" ")
    .map(matchElements, [])
    .reduce((acc, item) => acc + Number(item), 0)


const day1 = readFileSync(path.resolve(__dirname, 'day1.txt'), 'utf8');

assert(trebuchet(day1) === 54875, 'error'); // gold star
assert(trebuchet("tgkfk8ninestnk2eightoneeightwotcs") === 82, 'error');
assert(trebuchet("1abc2 pqr3stu8vwx a1b2c3d4e5f treb7uchet") === 142, 'error');
assert(trebuchet("two1nine eightwothree abcone2threexyz xtwone3four 4nineeightseven2 zoneight234 7pqrstsixteen") === 281, 'error');
assert(trebuchet("znmfvdlhvjtwo9three4tzjqcfcgnsevenccvnsjczlpm") === 27, 'error');
assert(trebuchet("eight226three5sevenhhxhqxns") === 87, 'error');
assert(trebuchet("jbtfkfourggc5zkc3nineninekv 379eight") === 87, 'error');
assert(trebuchet("nrtjrkkfour6fivefour7fivertjnxbbzg") === 45, 'err');