import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import '../styles/googlelinechart.css'
import axios from 'axios'

export default class GoogleLineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [[1,2]]
        }
    }

    componentDidMount() {
        let dataPromise = axios.get('http://localhost:5001/api/v1/memorydata').then(response => {
            let dataToDisplay = Object.keys(response.data[0].timeSeries).map(function(key) {
                return [Number(key), response.data[0].timeSeries[key]];
            });
            console.log(dataToDisplay)
            this.setState({
                data: dataToDisplay
            })
            this.render()
        })
        /*let data = axios.get(this.props.route).then(response => {
            this.props.setChartData(response.data);
        });*/
    }

    render() {
        console.log(this.state.data[0])
        return (
            <div className={'my-pretty-chart-container'}>
                <Chart
                chartType="AreaChart"
                data={[this.state.data]}
                options={{
                    columns: [
                        {
                            type: 'string',
                            label: 'time'
                        },
                        {
                            type: 'number',
                            label: 'usage'
                        }
                    ],
                    responsive: true,
                    colors: ['orange'],
                    backgroundColor: {fill: 'transparent'},
                    hAxis: {
                        textStyle:{color: '#FFF'}
                    },
                    vAxis: {
                        textStyle:{color: '#FFF'}
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
