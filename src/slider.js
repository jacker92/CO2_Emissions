import React from 'react';

class Slider extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {}
    }

handleChange = (x) => {
    
}

     whenClicked = () => {
        var output = document.getElementById("slider");
        var slider = document.getElementById("slider");
        slider.oninput = () => {
          output.innerHTML = this.value;
        }
      }
  
    render() {
      return(
        <div className="slidecontainer">
           <input id="slider" type="range" min="1" max="100" className="slider" onChange={this.handleChange(this)}/>
          </div>
      );
    }
  }

  export default Slider