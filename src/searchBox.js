import React from 'react';

class SearchBox extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        console.log("Component did mount.");

        let list = document.getElementById('myUL');
        list.style.display = 'none';
    }

    whenClicked = (e) => {
        console.log(e.target.innerText + " was clicked.");

        let list = document.getElementById('myUL');
        let li = list.getElementsByTagName('li');
        for (let i = 0; i < li.length; i++) {
            li[i].style.display = 'none';
        }

        this.props.callbackFromParent(e.target.innerText);
    }

    search = () => {
        // Declare variables
        let input, filter, ul, li, a, i, txtValue, list;
        input = document.getElementById('myInput');
        list = document.getElementById('myUL');
        
        // If no text has been provided, do not show any results
        if (input.value.length == 0) {
            list.style.display = 'none';
        } else {
            list.style.display = "";
        }
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName('li');


        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    render() {
        return (
            <div className="searchBoxContainer">
                <input type="text" id="myInput" onKeyUp={this.search} placeholder="Type country name.." />
                <ul id="myUL">
                    <li><a href="#" onClick={this.whenClicked}>Adele</a></li>
                    <li><a href="#" onClick={this.whenClicked}>Agnes</a></li>
                    <li><a href="#" onClick={this.whenClicked}>Billy</a></li>
                    <li><a href="#" onClick={this.whenClicked}>Bob</a></li>
                    <li><a href="#" onClick={this.whenClicked}>Calvin</a></li>
                    <li><a href="#" onClick={this.whenClicked}>Christina</a></li>
                    <li><a href="#" onClick={this.whenClicked}>Cindy</a></li>
                </ul>
            </div>
        );
    }
}

export default SearchBox
