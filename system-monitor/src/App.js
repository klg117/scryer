import React, { Component } from 'react'
import './App.css'
import SideBar from './containers/components/sidebar'
import ChartMat from './containers/components/chartmat'
import axios from 'axios'
import ChartData from './classes/ChartData';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.context = this;
        this.handleDisplayedChartsChange = this.handleDisplayedChartsChange.bind(this);
        this.gatherDataCollection = this.gatherDataCollection.bind(this);
        this.swapHourlyDisplayState = this.swapHourlyDisplayState.bind(this);
        this.state = {
            charts : new Map(),
            chartsToDisplay: new Map(),
            hourlyData: false,
        };
    }

    componentWillMount() {
        this.gatherDataCollection();
    }

    componentDidMount() {
        this.state.charts.forEach(chart => {
            chart.getData();
        });
    }

    gatherDataCollection() {
        let chartsTemp = new Map();
        chartsTemp.set('MEMORY', new ChartData('MEMORY', 'http://localhost:8080/api/v1/memorydata'));
        chartsTemp.set('DISK', new ChartData('DISK', 'http://localhost:8080/api/v1/diskdata'));
        chartsTemp.set('CPU', new ChartData('CPU', 'http://localhost:8080/api/v1/cpudata'));
        chartsTemp.set('NETWORK', new ChartData('NETWORK', 'http://localhost:8080/api/v1/networkdata'));
        this.setState({
            charts: chartsTemp
        })
    }

    handleDisplayedChartsChange(e) {
        let chartsTemp = this.state.chartsToDisplay;
        if (chartsTemp.has(e)) {
            chartsTemp.delete(e)
        } else {
            let chartData = this.state.charts.get(e);
            chartsTemp.set(e, chartData);
        }
        this.setState({
            chartsToDisplay: chartsTemp
        })
    }

    swapHourlyDisplayState() {
        if (this.state.hourlyData) {
            this.setState({
                hourlyData: false
            })
        } else {
            this.setState({
                hourlyData: true
            })
        }
        this.setState({
            chartsToDisplay: new Map()
        });
    }

    render() {
        return (
            <div className="App">
                <ChartMat
                chartsToDisplay={this.state.chartsToDisplay}
                hourlyData={this.state.hourlyData}
                />
                <SideBar 
                modifyDisplayedCharts={this.handleDisplayedChartsChange}
                swapHourlyDisplayState={this.swapHourlyDisplayState}
                />
            </div>
        );
    }
}
