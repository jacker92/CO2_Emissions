import React from 'react';

class SearchBoxItems extends React.Component {

    whenClicked = (e) => {
        this.props.parentCallback(e);
    }

    render() {
        return (
            <ul id="myUL">
                {this.props.items.map((item, i) =>
                    <li key={item.name} style={{ display: 'none' }}>
                        <a onClick={this.whenClicked}>{item.name}</a>
                    </li>
                )}
            </ul>

        )

    }
}

class SearchBox extends React.Component {

    constructor(props) {
        super(props)

        this.state = { }
    }

    componentDidMount() {
        console.log("Component did mount.");

        let list = document.getElementById('myUL');
        list.style.display = 'none';
    }

    componentDidUpdate() {
        console.log("Component did update!");
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
        this.setState({ updateRequired: true });

        // This is due the first time search is triggered
        setTimeout(() => {
            // Declare variables
            let input, filter, list, li, a, i, txtValue ;
            input = document.getElementById('myInput');
            list = document.getElementById('myUL');

            // If no text has been provided, do not show any results
            if (input.value.length == 0) {
                list.style.display = 'none';
            } else {
                list.style.display = "";
            }

            filter = input.value.toUpperCase();
            li = list.getElementsByTagName('li');

            // Loop through all list items, and hide those who don't match the search query
            let counter = 0;
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1 && counter <= 10) {
                    li[i].style.display = "";
                    counter++;
                } else {
                    li[i].style.display = "none";
                }
            }

        }, 100);

    }

    render() {
        return (
            <div className="searchBoxContainer">
                <input type="text" id="myInput" onKeyUp={this.search} placeholder="Type country name.." />
                <SearchBoxItems parentCallback={this.whenClicked} items={this.props.data} />
            </div>
        );
    }
}

export default SearchBox
