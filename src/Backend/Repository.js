const http = require('http');
const Country = require('./Country.js')
const countries = [];

const GetCountryPopulation = (country) => {
    http.get('http://api.worldbank.org/v2/country/' + country + "/indicator/SP.POP.TOTL?per_page=25000&format=json", (res) => {

        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log(JSON.parse(data)[1]);
            countries.push(new Country("1", "Jaakko"));
            console.log(countries[0].name);
        });

    });
}

const GetCountries = () => {
    console.log("Got the countries");
    let data = '';
    http.get('http://api.worldbank.org/v2/country?format=json&per_page=25000', (res) => {

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            let test = JSON.parse(data)[1];

            for (let i in test) {
                countries.push(new Country(test[i]["id"], test[i]["name"]));
                //GetCountryPopulation(test[i]["id"]);
            }
        });

    });
    return countries;
}

module.exports = {
    GetCountries,
    GetCountryPopulation
}




// Program gets all countries first, before anything.
// User can select a country from list.
// When user selects a country, query is done to the api with that country name.
//  and view the results based 
