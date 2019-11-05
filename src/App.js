import React from 'react';
import './App.css';
import Slider from './slider.js';
import SearchBox from './searchBox.js';
import LineChart from './LineChartCanvas.js';
import SortableComponent from './SortableComponent.js'

const Repo = require('./Backend/Repository.js')

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      chartData: {},
      countryData: {},
      selectedCountries: []
    }
  }

  async GetDataFromRepository() {

    console.log("Getting data.");
    await Repo.GetCountries().then(dataFromAPI => {
      this.setState({
        countryData: dataFromAPI
      })
    }).catch(err => {
      console.log(err);
    });
  }

  setChartData(countryName) {
    if (!countryName) {
      return;
    }
    console.log("Setting Chart Data!");
    console.log(this.state.countryData[countryName]);
    console.log(this.state.countryData[countryName].population);
  }


  componentDidMount() {
    console.log("AppComponent did mount.");
    this.setChartData();
    this.GetDataFromRepository();
  }

  dataAddedFromSearchBox = (dataFromChild) => {
    console.log("myCallBack!");

    let selectedCountriesVar = this.state.selectedCountries;
    if (selectedCountriesVar.indexOf(dataFromChild) === -1) {
      selectedCountriesVar.push(dataFromChild);
    }

    this.setState({
      selectedCountries: selectedCountriesVar
    })

    console.log("SelectedCountries: " + this.state.selectedCountries);
    this.updateChartData(dataFromChild);

  }

  updateChartData = (countryName) => {
    let countryNameVar = "";
    if(countryName && this.state.countryData[countryName]) {
      countryNameVar = this.state.countryData[countryName].name || "";
    }

    let dataVar = [];

    if(this.state.countryData[countryName]) {
      dataVar = this.state.countryData[countryName].populationToArray() || [];
    }

    this.setState({
      chartData: {
        id: '10',
        labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        datasets: [
          {
            label: countryNameVar + ' Population',
            data: dataVar,
            backgroundColor: '#ffffff'
          }
        ]
      }
    });
  }

  onRemoveFromSortableComponent = (value) => {
    console.log("On REMOVE");
    let selectedCountriesVar = this.state.selectedCountries;

    let index = selectedCountriesVar.indexOf(value);
    if (index > -1) {
      selectedCountriesVar.splice(index, 1);
    }

    this.setState({
      selectedCountries: selectedCountriesVar
    })

    this.updateChartData();
  }

  onSortedFromSortableComponent = (sortedItems) => {
    this.setState({
      selectedCountries: sortedItems
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>CO² Emissions</h1>
          <p>
            View CO² emissions in different countries
          </p>
        </header>
        <SearchBox callbackFromParent={this.dataAddedFromSearchBox} data={this.state.countryData} />
        <div id="chartContainer">
          <LineChart chartData={this.state.chartData} />
          <div id="selectedList">
            <h2>Selected Countries</h2>
            <SortableComponent
              data={this.state.selectedCountries}
              onRemove={this.onRemoveFromSortableComponent}
              onSorted={this.onSortedFromSortableComponent} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
