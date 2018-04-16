import React, { Component } from 'react'
import './App.css'
import SideBar from './containers/components/sidebar'
import ChartMat from './containers/components/chartmat'
import axios from 'axios'
import ChartData from './classes/ChartData';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleDisplayedChartsChange = this.handleDisplayedChartsChange.bind(this);
    this.state = {
        charts : [],
        chartData: [],
    };
  }

  handleDisplayedChartsChange(e) {
    let routes = [{'CPU' : '127.0.0.1:8080/api/v1/diskdata'}, {'MEMORY' : '127.0.0.1:8080/api/v1/diskdata'}, {'NETWORK' : '127.0.0.1:8080/api/v1/diskdata'}, {'DISK' : '127.0.0.1:8080/api/v1/diskdata'}]
    let data = this.state.chartData[e];
    let chartsTemp = this.state.charts;
    let chartData = new ChartData(e, data, 'usage', 'time', routes[e]);
    if(chartsTemp.includes(chartData.title)) {
      let index = chartsTemp.indexOf(chartData.title)
      chartsTemp.splice(index, 1);
    } else {
      chartsTemp.push(chartData);
    }
    this.setState({
      charts: chartsTemp
    })
  }

  componentDidMount() {
    let chartDatatemp = [];
    console.log('we mounted')
    let dataGatherPromise = new Promise(function(resolve, reject) {
        axios.get('http://localhost:8080/api/v1/memorydata').then(response => {
            let rawMemoryData = Object.keys(response.data[0].timeSeries).map(function(key) {
                return [Number(key), response.data[0].timeSeries[key]];
            });
            chartDatatemp.push({'MEMORY' : rawMemoryData});
            console.log('finished grabbing memorydata')
        });
        axios.get('http://localhost:8080/api/v1/cpudata').then(response => {
            let rawCpuData = Object.keys(response.data[0].timeSeries).map(function(key) {
                return [Number(key), response.data[0].timeSeries[key]];
            });
            chartDatatemp.push({'CPU' : rawCpuData});
            console.log('finished grabbing cpudata')
        });
        axios.get('http://localhost:8080/api/v1/diskdata').then(response => {
            let rawDiskData = Object.keys(response.data[0].timeSeries).map(function(key) {
                return [Number(key), response.data[0].timeSeries[key]];
            });
            chartDatatemp.push({'DISK' : rawDiskData});
            console.log('finished grabbing diskdata')
        });
        axios.get('http://localhost:8080/api/v1/networkdata').then(response => {
            let rawNetworkData = Object.keys(response.data[0].timeSeries).map(function(key) {
                return [Number(key), response.data[0].timeSeries[key]];
            });
            chartDatatemp.push({'NETWORK' : rawNetworkData});
            console.log('finished grabbing networkdata')
        });
    }).then(response => {
        console.log('setting state data')
        this.setState({
            chartData: chartDatatemp
        });
        console.log('finished setting state data')
    })
  }
  render() {  
    return (
      <div className="App">
        <ChartMat
        charts={this.state.charts}
        />
        <SideBar modifyDisplayedCharts={this.handleDisplayedChartsChange}/>
      </div>
    );
  }
}
