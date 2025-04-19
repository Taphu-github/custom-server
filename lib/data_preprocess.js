const connectToMongoDB = require("./mongodb");
const detected_animal = require("../models/detected_animal");
const moment = require("moment");

async function preprocessAnimalData() {
  try {
    const data = await detected_animal.find();

    const uniqueDates = [
      ...new Set(
        data.map(({ enroach_date }) =>
          moment(enroach_date).format("YYYY-MM-DD")
        )
      ),
    ].sort();

    // Indexes map: 0-Bear, 1-Boar, 2-Cattle, 3-Deer, 4-Elephant, 5-Horse, 6-Monkey
    const animalArrays = {
      Bear: new Array(uniqueDates.length).fill(0),
      Boar: new Array(uniqueDates.length).fill(0),
      Cattle: new Array(uniqueDates.length).fill(0),
      Deer: new Array(uniqueDates.length).fill(0),
      Elephant: new Array(uniqueDates.length).fill(0),
      Horse: new Array(uniqueDates.length).fill(0),
      Monkey: new Array(uniqueDates.length).fill(0),
    };

    const idToAnimal = {
      0: "Bear",
      1: "Boar",
      2: "Cattle",
      3: "Deer",
      4: "Elephant",
      5: "Horse",
      6: "Monkey",
    };

    // Fill arrays
    data.forEach(({ enroach_date, animal_count, a_c_id }) => {
      const dateIndex = uniqueDates.indexOf(
        moment(enroach_date).format("YYYY-MM-DD")
      );
      const animal = idToAnimal[a_c_id];
      if (animal && dateIndex !== -1) {
        animalArrays[animal][dateIndex] += animal_count;
      }
    });

    // Create sums array in the same order
    const sums = Object.keys(animalArrays).map((animal) =>
      animalArrays[animal].reduce((acc, val) => acc + val, 0)
    );

    return {
      Dates: uniqueDates,
      ...animalArrays,
      Sums: sums,
    };
  } catch (error) {
    // Fallback to safe defaults
    return {
      Dates: [],
      Bear: [],
      Boar: [],
      Cattle: [],
      Deer: [],
      Elephant: [],
      Horse: [],
      Monkey: [],
      Sums: [0, 0, 0, 0, 0, 0, 0],
    };
  }
}

module.exports = { preprocessAnimalData };
