import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import '../styles/googlelinechart.css'
import axios from 'axios'

export default class GoogleLineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let data = axios.get('http://localhost/api/v1/memorydata', {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }).then(response => {
            this.setState({
                data: response.data.timeSeries
            })
            response.timeSeries.forEach(e => {
                console.log(e);
            })
        })
        /*let data = axios.get(this.props.route).then(response => {
            this.props.setChartData(response.data);
        });*/
    }

    render() {
        return (
            <div className={'my-pretty-chart-container'}>
                <Chart
                chartType="AreaChart"
                data={this.state.data}
                options={{
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
