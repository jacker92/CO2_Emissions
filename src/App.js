import React from 'react';
import './App.css';
import Slider from './slider.js';
import SearchBox from './searchBox.js';
import LineChart from './LineChart.js';
import SortableComponent from './SortableComponent.js'

let selectedCountriesData = [];

class App extends React.Component {

  state = {
    updateSortableList: {}
  }

  myCallback = (dataFromChild) => {
    console.log("myCallBack!");
    if(selectedCountriesData.indexOf(dataFromChild) === -1) {
      selectedCountriesData.push(dataFromChild);
    }
    this.updateSortableList();
  }

    updateSortableList = () => {
    this.setState({updateSortableList : !this.state.updateSortableList});
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
        <SearchBox callbackFromParent={this.myCallback}/>
        <div id="chartContainer">
          <LineChart />
          <div id="selectedList">
            <h2>Selected Countries</h2>
            <SortableComponent data={selectedCountriesData}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
