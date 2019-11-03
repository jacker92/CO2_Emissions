import React from 'react';
import './App.css';
import Slider from './slider.js';
import SearchBox from './searchBox.js';
import LineChart from './LineChart.js';
import SortableComponent from './SortableComponent.js'

const Repo = require('./Backend/Repository.js')

const allCountries = Repo.GetCountries();
let selectedCountries = [];
const selectedCountriesData = [{
  name: "Testia",
  data: [10, 41, 35, 51, 49, 62, 69, 91, 148,133,12, 62, 69, 91, 148,133,12, 44,88]
}];

class App extends React.Component {

  state = {
    updateSortableList: {}
  }

  componentDidMount() {
    console.log("AppComponent did mount.");
    this.setStateToUpdateComponents();
  }

  dataAddedFromSearchBox = (dataFromChild) => {
    console.log("myCallBack!");

    if (selectedCountries.indexOf(dataFromChild) === -1) {
      selectedCountries.push(dataFromChild);
    }
    this.setStateToUpdateComponents();
    console.log("selectedCountries: " + selectedCountries);

    // Somewhere here updating the chart
  }

  setStateToUpdateComponents = () => {
    this.setState({ updateSortableList: this.state.updateSortableList });
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
          <LineChart data={selectedCountriesData}/>
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
