import ReactApexChart from "react-apexcharts";
import React from 'react';

ReactApexChart.colors = ['#ff0000'];

class LineChart extends React.Component {
      
    constructor(props) {
      super(props);
  
      this.state = {
        options: {
          chart: {
                zoom: {
                    enabled: true
                }
            },
            colors: ['#ff0000', '#ff0000'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left',
            },
            theme: {
              mode: 'dark',
              palette: 'palette5' // upto palette10
            },
            grid: {
                row: {
                    colors: ['#000000', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            }
        },
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148,133,12, 62, 69, 91, 148,133,12, 44,88]
        }],
      }
    }
  
    render() {
  
      return (
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.props.data} type="line" height="500" />
        </div>
      );
    }
  }

  export default LineChart