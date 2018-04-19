import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import '../styles/googlelinechart.css'
import axios from 'axios'

export default class GoogleLineChart extends Component {
    constructor(props) {
        super(props);
        this.state= {
            testData: [['TIME', 'USAGE']]
        };
    }

    componentDidMount() {
        this.props.chartData.forEach(element => {
            let dataPoint = element[1];
            let value = dataPoint[1];
            let time = dataPoint[0];
            let arrayToPush = [time, value];
            this.setState((prevState) => {
                testData: prevState.testData.push(arrayToPush)
            });
        });
        for (var index = 0; index < 10; index++) {
            let current = this.props.chartData[index + 100000]
        }
    }

    render() {
        return (
            <div className={'my-pretty-chart-container'}>
                <Chart
                chartType="AreaChart"
                data={this.state.testData}
                options={{
                    responsive: true,
                    colors: ['orange'],
                    backgroundColor: {fill: 'transparent'},
                    hAxis: {
                        title: 'Time'
                    },
                    vAxis: {
                        title: 'Usage'
                    },
                    legend: {
                        textStyle:{color: '#FFF'}
                    },
                    legend: {
                        position: 'none'
                    }
                }}
                graph_id={this.props.graphId}
                width="100%"
                height="100%"
                legend_toggle
                />
            </div>
        );
    }
}
