import { Bar } from 'react-chartjs-2';
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
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'top'
    }

    render() {
        return (
            <div className='chart'>
                <Bar
                    data={this.props.chartData}
                    width={null}
                    height={null}
                    ref={(reference) => this.reference = reference}
                    options={{
                        scales: {
                            yAxes: [{
                                id:'Population',
                                position:'left',
                                ticks: {
                                    callback(value) {
                                        if (!Number.isInteger(value) || value === 1) {
                                            return Number(value * 100000).toLocaleString('en');
                                        } else {
                                            return Number(value).toLocaleString('en');
                                        }
                                    }
                                }
                            }, {
                                id: "CO2",
                                position:'right',
                                ticks: {
                                    callback(value) {
                                        if ( value <= 1) {
                                            return Number(value * 1000).toLocaleString('en');
                                        } else {
                                            return Number(value).toLocaleString('en');
                                        }
                                    }
                                } 
                            }]
                        },
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