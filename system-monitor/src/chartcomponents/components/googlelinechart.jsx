import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import '../styles/googlelinechart.css'
import axios from 'axios'

export default class GoogleLineChart extends Component {
    render() {
        return (
            <div className={'my-pretty-chart-container'}>
                <Chart
                chartType="AreaChart"
                options={{
                    columns: [
                        {
                            label: 'time'
                        },
                        {
                            label: 'usage'
                        }
                    ],
                    rows: [
                        []
                    ],
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
