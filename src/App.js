import React from 'react';
import './App.css';
import Slider from './slider.js';
import SearchBox from './searchBox.js';
import LineChart from './LineChart.js';
import SortableComponent from './SortableComponent.js'

const selectedCountriesData = [];

class App extends React.Component {

  state = {
    updateSortableList: {}
  }

  dataAddedFromSearchBox = (dataFromChild) => {
    console.log("myCallBack!");
    if (selectedCountriesData.indexOf(dataFromChild) === -1) {
      selectedCountriesData.push(dataFromChild);
    }
    this.updateSortableList();
    console.log("selectedCountriesData: " + selectedCountriesData);
  }

  updateSortableList = () => {
    console.log(this);
    this.setState({ updateSortableList: this.state.updateSortableList });
  }

  onRemoveFromSortableComponent = (value) => {
    let index = selectedCountriesData.indexOf(value);
    if (index > -1) {
      selectedCountriesData.splice(index, 1);
    }
    this.updateSortableList();
  }

  onSortedFromSortableComponent = (sortedItems) => {
    selectedCountriesData = sortedItems;
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
        <SearchBox callbackFromParent={this.dataAddedFromSearchBox} />
        <div id="chartContainer">
          <LineChart />
          <div id="selectedList">
            <h2>Selected Countries</h2>
            <SortableComponent 
            data={selectedCountriesData} 
            onRemove={this.onRemoveFromSortableComponent}
            onSorted={this.onSortedFromSortableComponent} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
