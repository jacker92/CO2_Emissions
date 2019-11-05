const Country = require('./Country.js')
const countries = [];

async function GetCountryPopulation(country) {
    let population = {};

    const body = await fetch('http://api.worldbank.org/v2/country/' + country + "/indicator/SP.POP.TOTL?per_page=25000&date=2000:2018&format=json");
    let json = await body.json();
    json = json[1];

    if (json) {
        for (let index = 0; index < json.length; index++) {
            const element = json[index];
            population[element.date] = element.value;
        }

    }

    return new Promise((resolve, reject) => {
        console.log("Returning population");
        resolve(population);
    })
}

async function GetCountries() {
    const body = await fetch('http://api.worldbank.org/v2/country?format=json&per_page=25000');

    let test = await body.json();
    test = test[1];

    for (let i in test) {
        await GetCountryPopulation(test[i]["id"]).then((pop) => {
            if(Object.keys(pop).length > 0) {
                countries[test[i]["name"]] = new Country(test[i]["id"], test[i]["name"], pop);
            } 
        });
    }
    console.log("returning new promise");
    return new Promise((resolve, reject) => {
            resolve(countries);
    })

}



module.exports = {
    GetCountries,
    GetCountryPopulation
}




// Program gets all countries first, before anything.
// User can select a country from list.
// When user selects a country, query is done to the api with that country name.
//  and view the results based 
