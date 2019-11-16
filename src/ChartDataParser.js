const colorArray = ["#1E0073", "#F44B27", "#ffffff", "#F1FF88", "#A8C8F7", "#9B3147"]

const convertPopulationToDataArray = (data) => {
    let dataArray = [];
    for (let key in data.population) {
        dataArray.push(data.population[key]);
    }
    return dataArray;
}

const convertCo2DataToDataArray = (data) => {
    let dataArray = [];
    for (let key in data.co2Data) {
        dataArray.push(data.co2Data[key]);
    }
    return dataArray;
}

const CreateChartData = (selectedCountries, countryData) => {

    let chartData = [];

    if (selectedCountries) {
        console.log("Selected countries length: " + selectedCountries.length);
        for (let index = 0; index < selectedCountries.length; index++) {

            let chartIndex = index * 2;
            let countryNameVar = "";
            let countryName = selectedCountries[index]
            if (countryName && countryData[countryName]) {
                countryNameVar = countryData[countryName].name || "";
            }

            let dataVar = [];

            if (countryData[countryName]) {
                dataVar = convertPopulationToDataArray(countryData[countryName]);
            }

            chartData[chartIndex] = {
                type: 'bar',
                fill: 'false',
                label: countryNameVar + ' Population',
                yAxisID: 'Population',
                data: dataVar,
                backgroundColor: colorArray[chartIndex%6]
            }

            dataVar = [];

            if (countryData[countryName]) {
                dataVar = convertCo2DataToDataArray(countryData[countryName]);
            }

            chartData[chartIndex + 1] = {
                type: 'line',

                label: countryNameVar + ' CO2 emissions',
                yAxisID: 'CO2',
                data: dataVar,
                backgroundColor: colorArray[(chartIndex + 1)%6]
            }
        }
    }

    let returnable = {
        id: "10",
        labels: ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        datasets: chartData
    }
    
    return returnable;
}

module.exports = {
    CreateChartData
}