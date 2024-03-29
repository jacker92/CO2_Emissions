import React from 'react';
import './App.css';
import SearchBox from './searchBox.js';
import LineChart from './LineChartCanvas.js';
import SortableComponent from './SortableComponent.js'
import ChartDataParser from './ChartDataParser.js'
import runtimeEnv from '@mars/heroku-js-runtime-env';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      chartData: {},
      countryData: {},
      selectedCountries: []
    }
  }

  async GetDataFromAPI() {
    const env = runtimeEnv();
    let url = "";

    if (env.REACT_APP_BACKEND_URL) {
      url = env.REACT_APP_BACKEND_URL;
    } else {
      url = "http://localhost:3001/";
    }
    await fetch(url + "api/combined").then(async dataFromAPI => {
      let json = await dataFromAPI.json();
      this.setState({
        countryData: json
      })
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.GetDataFromAPI();
  }

  dataAddedFromSearchBox = (dataFromChild) => {

    let selectedCountriesVar = this.state.selectedCountries;
    if (selectedCountriesVar.length >= 3) {
      return;
    }

    if (selectedCountriesVar.indexOf(dataFromChild) === -1) {
      selectedCountriesVar.push(dataFromChild);
    }

    this.setState({
      selectedCountries: selectedCountriesVar
    })

    this.updateChartData(this.state.selectedCountries);
  }

  updateChartData = (countries) => {
    let chartData = ChartDataParser.CreateChartData(countries, this.state.countryData);

    this.setState({
      chartData: chartData
    });
  }

  onRemoveFromSortableComponent = (value) => {
    let selectedCountriesVar = this.state.selectedCountries;

    let index = selectedCountriesVar.indexOf(value);
    if (index > -1) {
      selectedCountriesVar.splice(index, 1);
    }

    this.setState({
      selectedCountries: selectedCountriesVar
    })

    if (this.state.selectedCountries) {
      this.updateChartData(this.state.selectedCountries);
    } else {
      this.updateChartData();
    }
  }

  onSortedFromSortableComponent = (sortedItems) => {
    this.setState({
      selectedCountries: sortedItems
    })
    this.updateChartData(sortedItems);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>CO² Emissions</h1>
          <p>
            View CO² emissions and population in different countries
          </p>
        </header>
        <SearchBox callbackFromParent={this.dataAddedFromSearchBox} data={this.state.countryData} />
        <div id="chartContainer">
          <LineChart chartData={this.state.chartData} />
          </div>
          <div id="selectedList">
            <h2>Selected Countries</h2>
            <SortableComponent
              data={this.state.selectedCountries}
              onRemove={this.onRemoveFromSortableComponent}
              onSorted={this.onSortedFromSortableComponent} />
        </div>
      </div>
    );
  }
}

export default App;
