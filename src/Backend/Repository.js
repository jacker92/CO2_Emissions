const http = require('http');
const Country = require('./Country.js')
const countries = [];

const GetCountryPopulation = (country) => {

  /*  http.get('http://api.worldbank.org/v2/country/' + country + "/indicator/SP.POP.TOTL?per_page=25000&format=json", (res) => {

        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            //console.log(JSON.parse(data)[1]);
            //console.log(countries[0].name);
        });

    });
    */
    return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
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
                let pop = GetCountryPopulation(test[i]["id"]);
                countries.push(new Country(test[i]["id"], test[i]["name"], pop));
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
