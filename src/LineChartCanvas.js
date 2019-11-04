import { Bar, Line, Pie } from 'react-chartjs-2';
import React from 'react';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: this.props.chartData
        }
    }

    componentDidUpdate() {
        console.log("LineChartCanvas did update!");
        console.log("abc");
        console.log(this.props.chartData);
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'top',
    }

    render() {
        console.log("In line canvas render!");
        return (
            <div className='chart'>
                <Bar
                    data={this.props.chartData}
                    width={1}
                    height={400}
                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: this.props.displayTitle,
                            text: 'CO2 emissions'
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}
                />
            </div>
        )
    }
}

export default Canvas;