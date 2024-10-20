const connectToMongoDB = require("./mongodb");
const detected_animal = require("../models/detected_animal");
const moment = require("moment");

async function preprocessAnimalData() {
    try {
        const data = await detected_animal.find()
        //console.log(data)

        const uniqueDates = [...new Set(data.map(({enroach_date}) => moment(enroach_date).format('YYYY-MM-DD')))].sort();
        
        // Step 2: Initialize seven arrays filled with zeros
        const horseArray = new Array(uniqueDates.length).fill(0);
        const monkeyArray = new Array(uniqueDates.length).fill(0);
        const bearArray = new Array(uniqueDates.length).fill(0);
        const boarArray = new Array(uniqueDates.length).fill(0);
        const cattleArray = new Array(uniqueDates.length).fill(0);
        const deerArray = new Array(uniqueDates.length).fill(0);
        const elephantArray = new Array(uniqueDates.length).fill(0);
        // Initialize arrays for other animals similarly...

        // Step 3: Iterate through the data and accumulate total animal counts per day
        data.forEach(({ enroach_date, animal_count, a_c_id }) => {

            const dateIndex = uniqueDates.indexOf(moment(enroach_date).format('YYYY-MM-DD'));
            switch (a_c_id) {
                case '0':
                    bearArray[dateIndex] += animal_count;
                    break;
                case '1':
                    boarArray[dateIndex] += animal_count;
                    break;
                case '2':
                    cattleArray[dateIndex] += animal_count;
                    break;
                case '3':
                    deerArray[dateIndex] += animal_count;
                    break;
                case '4':
                    elephantArray[dateIndex] += animal_count;
                    break;
                case '5':
                    horseArray[dateIndex] += animal_count;
                    break;
                case '6':
                    monkeyArray[dateIndex] += animal_count;
                    break;

            }
        });
        const tot = ["Bear", "Boar", "Cattle", "Deer", "Elephant", "Horse", "Monkey"];

        const sum = arr => arr.reduce((acc, currentValue) => acc + currentValue, 0);
        const sums = []

        sums.push(sum(bearArray));
        sums.push(sum(boarArray));
        sums.push(sum(cattleArray));
        sums.push(sum(deerArray));
        sums.push(sum(elephantArray));
        sums.push(sum(horseArray));
        sums.push(sum(monkeyArray));

        const returnobj = {
            'Dates': uniqueDates,
            'Bear': bearArray,
            'Boar': boarArray,
            'Cattle': cattleArray,
            'Deer': deerArray,
            'Elephant': elephantArray,
            'Horse': horseArray,
            'Monkey': monkeyArray,
            'Sums': sums
        };
        

        return returnobj;

    } catch (error) {
        return {
            'Dates': [],
            'Bear': [],
            'Boar': [],
            'Cattle': [],
            'Deer': [],
            'Elephant': [],
            'Horse': [],
            'Monkey': [],
            'Sums': {
                'Bear': 0,
                'Boar': 0,
                'Cattle': 0,
                'Deer': 0,
                'Elephant': 0,
                'Horse': 0,
                'Monkey': 0
            }
        }
    }
}

module.exports = { preprocessAnimalData }