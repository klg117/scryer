import React, { Component } from 'react'
import './App.css'
import SideBar from './containers/components/sidebar'
import ChartMat from './containers/components/chartmat'
import axios from 'axios'
import ChartData from './classes/ChartData';

export default class App extends Component {
  constructor(props) {
    super(props);
    console.log('the constructor')
    this.handleDisplayedChartsChange = this.handleDisplayedChartsChange.bind(this);
    this.gatherDataCollection = this.gatherDataCollection.bind(this);
    this.state = {
        charts : new Map(),
        chartData: new Map(),
        chartsToDisplay: new Map(),
    };
  }

    componentWillMount() {
        this.gatherDataCollection();
        /*axios.get('http://localhost:8080/api/v1/memorydata').then(response => {
            let timeSeries = response.data[0].timeSeries;
            let rawMemoryData = Object.keys(timeSeries).map(function(key) {
                let current = timeSeries[key];
                let innerKey = Object.keys(timeSeries[key])[0];
                let innerValue = current[innerKey];
                return [Number(key), [innerKey, innerValue]];
            });
            self.setState((prevState) => {
                chartData: prevState.chartData.set('MEMORY', rawMemoryData)
            });
        });
        axios.get('http://localhost:8080/api/v1/cpudata').then(response => {
            let timeSeries = response.data[0].timeSeries;
            let rawCpuData = Object.keys(timeSeries).map(function(key) {
                let current = timeSeries[key];
                let innerKey = Object.keys(timeSeries[key])[0];
                let innerValue = current[innerKey];
                return [Number(key), [innerKey, innerValue]];
            });
            self.setState((prevState) => {
                chartData: prevState.chartData.set('CPU', rawCpuData)
            });
        });
        axios.get('http://localhost:8080/api/v1/diskdata').then(response => {
            let timeSeries = response.data[0].timeSeries;
            let rawDiskData = Object.keys(timeSeries).map(function(key) {
                let current = timeSeries[key];
                let innerKey = Object.keys(timeSeries[key])[0];
                let innerValue = current[innerKey];
                return [Number(key), [innerKey, innerValue]];
            });
            self.setState((prevState) => {
                chartData: prevState.chartData.set('DISK', rawDiskData)
            });
        });
        axios.get('http://localhost:8080/api/v1/networkdata').then(response => {
            let timeSeries = response.data[0].timeSeries;
            let rawNetworkData = Object.keys(timeSeries).map(function(key) {
                let current = timeSeries[key];
                let innerKey = Object.keys(timeSeries[key])[0];
                let innerValue = current[innerKey];
                return [Number(key), [innerKey, innerValue]];
            });
            self.setState((prevState) => {
                chartData: prevState.chartData.set('NETWORK', rawNetworkData)
            });
        });*/
  }

  componentDidMount() {
    this.state.charts.forEach(chart => {
        chart.getData();
    });
  }

  gatherDataCollection() {
    console.log('gathering data')
    let chartsTemp = new Map();
    chartsTemp.set('MEMORY', new ChartData('MEMORY', 'http://localhost:8080/api/v1/memorydata'));
    chartsTemp.set('DISK', new ChartData('DISK', 'http://localhost:8080/api/v1/diskdata'));
    chartsTemp.set('CPU', new ChartData('CPU', 'http://localhost:8080/api/v1/cpudata'));
    chartsTemp.set('NETWORK', new ChartData('NETWORK', 'http://localhost:8080/api/v1/networkdata'));
    console.log('chartsTemp: ' + chartsTemp);
    console.log(chartsTemp.size)
    this.setState({
        charts: chartsTemp
    })
    /*this.setState((prevState) => ({
        charts: prevState.charts.set('MEMORY', new ChartData('MEMORY', 'http://localhost:8080/api/v1/memorydata'))
    }));
    this.setState((prevState) => ({
        charts: prevState.charts.set('DISK', new ChartData('DISK', 'http://localhost:8080/api/v1/diskdata'))
    }));
    this.setState((prevState) => ({
        charts: prevState.charts.set('CPU', new ChartData('CPU', 'http://localhost:8080/api/v1/cpudata'))
    }));
    this.setState((prevState) => ({
        charts: prevState.charts.set('NETWORK', new ChartData('NETWORK', 'http://localhost:8080/api/v1/networkdata'))
    }));*/
  }

  handleDisplayedChartsChange(e) {
    console.log(this.state.charts)
    /*console.log(e)
    let data = this.state.chartData.get(e);
    let chartsTemp = this.state.chartsToDisplay;
    let chartData = new ChartData(e, '');
    if (chartsTemp.has(e)) {
        chartsTemp.delete(e)
    } else {
        chartsTemp.set(e, chartData);
    }*/
    /*if(chartsTemp.includes(chartData.title)) {
      let index = chartsTemp.indexOf(chartData.title);
      chartsTemp.splice(index, 1);
    } else {
      chartsTemp.push(chartData);
    }*/
    /*this.setState({
      charts: chartsTemp
    })*/
  }

  render() {
    return (
        <div className="App">
            <ChartMat
            chartsToDisplay={this.state.chartsToDisplay}
            chartData={this.state.chartData}
            />
            <SideBar modifyDisplayedCharts={this.handleDisplayedChartsChange}/>
        </div>
    );
  }
}
