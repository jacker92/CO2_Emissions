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
                    enabled: false
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
              palette: 'palette10' // upto palette10
            },
            grid: {
                row: {
                    colors: ['#000000', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
            }
        },
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
      }
    }
  
    render() {
  
      return (
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="400" />
        </div>
      );
    }
  }

  export default LineChart