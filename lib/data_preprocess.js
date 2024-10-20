const connectToMongoDB = require("./mongodb");
const detected_animal = require("../models/detected_animal");


async function preprocessAnimalData(){
    try{
        const data= detected_animal.find()
        const uniqueDates = [...new Set(data.map(({ enroachDate }) => moment(enroachDate).format('YYYY-MM-DD')))].sort();

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
        data.forEach(({ enroachDate, animalCount, animalname }) => {
        const dateIndex = uniqueDates.indexOf(moment(enroachDate).format('YYYY-MM-DD'));
        switch (animalname) {
            case 'Bear':
            bearArray[dateIndex] += animalCount;
            break;
            case 'Boar':
            boarArray[dateIndex] += animalCount;
            break;
            case 'Cattle':
            cattleArray[dateIndex] += animalCount;
            break;
            case 'Deer':
            deerArray[dateIndex] += animalCount;
            break;
            case 'Elephant':
            elephantArray[dateIndex] += animalCount;
            break;
            case 'Horse':
            horseArray[dateIndex] += animalCount;
            break;
            case 'Monkey':
            monkeyArray[dateIndex] += animalCount;
            break;
            
        }
        });
        const tot=["Bear","Boar","Cattle","Deer","Elephant","Horse","Monkey"];

        const sum = arr => arr.reduce((acc, currentValue) => acc + currentValue, 0);
        const sums=[]
        
        sums.push(sum(bearArray));
        sums.push(sum(boarArray));
        sums.push(sum(cattleArray));
        sums.push(sum(deerArray));
        sums.push(sum(elephantArray));
        sums.push(sum(horseArray));
        sums.push(sum(monkeyArray));

        const returnobj={
            'Dates': uniqueDates,
            'Bear':bearArray,
            'Boar': boarArray,
            'Cattle':cattleArray,
            'Deer':deerArray,
            'Elephant':elephantArray,
            'Horse':horseArray,
            'Monkey':monkeyArray.at,
            'Sums':sums
        };

        return returnobj;

    }catch(error){
        return {
            'Dates': [],
            'Bear': [],
            'Boar': [],
            'Cattle': [],
            'Deer': [],
            'Elephant': [],
            'Horse': [],
            'Monkey': [],
            'Sums':{
                'Bear': 0,
                'Boar': 0,
                'Cattle': 0,
                'Deer':0,
                'Elephant': 0,
                'Horse': 0,
                'Monkey': 0
            }
        }
    }
}

module.exports={preprocessAnimalData}