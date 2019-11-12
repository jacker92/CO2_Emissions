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
        this.reference.chartInstance.update();
        console.log("LineChartCanvas did update!");
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'top'
    }

    render() {
        console.log("In line canvas render!");
        return (
            <div className='chart'>
                <Bar
                    data={this.props.chartData}
                    width={1}
                    height={400}
                    ref={(reference) => this.reference = reference}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    callback(value) {
                                        if (!Number.isInteger(value) || value == 1) {
                                            return Number(value * 100000).toLocaleString('en');
                                        } else {
                                            return Number(value).toLocaleString('en');
                                        }
                                    }
                                }
                            }]
                        },
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