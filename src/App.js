import React from 'react';
import './App.css';
import Slider from './slider.js';
import SearchBox from './searchBox.js';
import LineChart from './LineChartCanvas.js';
import SortableComponent from './SortableComponent.js'

const Repo = require('./Backend/Repository.js')

const allCountries = Repo.GetCountries();
let indexi = 0;
let selectedCountries = [];
const selectedCountriesData = [{
  name: "Testia",
  data: [10, 41, 35, 51, 49, 62, 69, 91, 2, 133, 12, 62, 69, 91, 148, 133, 12, 44, 88]
}];

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      chartData:{}
    }
  }

  getChartData() {
    indexi += 1000;
    console.log("Getting Chart Data!");

    this.setState({
      chartData: {
        labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        datasets: [
            {
                label: 'Population',
                data: [indexi, 41, 35, 51, 49, 62, 69, 91, 148, 133, 12, 62, 69, 91, 148, 133, 12, 44, 88],
                backgroundColor: '#ffffff'
            }
        ]
      }
    })
  }

  state = {
    updateSortableList: {}
  }

  componentDidMount() {
    this.getChartData();
    console.log("AppComponent did mount.");
    this.setStateToUpdateComponents();
  }

  dataAddedFromSearchBox = (dataFromChild) => {
      // Somewhere here updating the chart
      selectedCountriesData[0].name = dataFromChild;
      selectedCountriesData[0].data = Repo.GetCountryPopulation(dataFromChild);
      
    console.log("myCallBack!");

    if (selectedCountries.indexOf(dataFromChild) === -1) {
      selectedCountries.push(dataFromChild);
    }
    console.log("selectedCountries: " + selectedCountries);
    this.setStateToUpdateComponents();
    console.log(selectedCountriesData);
  }

  setStateToUpdateComponents = () => {
    this.setState({ updateSortableList: this.state.updateSortableList });
    this.getChartData();
  }

  onRemoveFromSortableComponent = (value) => {
    let index = selectedCountries.indexOf(value);
    if (index > -1) {
      selectedCountries.splice(index, 1);
    }
    this.setStateToUpdateComponents();
  }

  onSortedFromSortableComponent = (sortedItems) => {
    selectedCountries = sortedItems;
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
        <SearchBox callbackFromParent={this.dataAddedFromSearchBox} data={allCountries} />
        <div id="chartContainer">
          <LineChart chartData={this.state.chartData}/>
          <div id="selectedList">
            <h2>Selected Countries</h2>
            <SortableComponent
              data={selectedCountries}
              onRemove={this.onRemoveFromSortableComponent}
              onSorted={this.onSortedFromSortableComponent} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
