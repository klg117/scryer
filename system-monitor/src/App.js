import React, { Component } from 'react'
import './App.css'
import SideBar from './containers/components/sidebar'
import ChartMat from './containers/components/chartmat'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {charts : []};
    this.handleDisplayedChartsChange = this.handleDisplayedChartsChange.bind(this);
    axios.get('http://localhost:8080/api/v1/memorydata').then(response => {
      let rawMemoryData = Object.keys(response.data[0].timeSeries).map(function(key) {
          return [Number(key), response.data[0].timeSeries[key]];
      });
      this.setState({
          MemoryData: rawMemoryData
      })
      });
      axios.get('http://localhost:8080/api/v1/cpudata').then(response => {
          let rawCpuData = Object.keys(response.data[0].timeSeries).map(function(key) {
              return [Number(key), response.data[0].timeSeries[key]];
          });
          this.setState({
              CpuData: rawCpuData
          })
      });
      axios.get('http://localhost:8080/api/v1/diskdata').then(response => {
          let rawDiskData = Object.keys(response.data[0].timeSeries).map(function(key) {
              return [Number(key), response.data[0].timeSeries[key]];
          });
          this.setState({
              DiskData: rawDiskData
          })
      });
      axios.get('http://localhost:8080/api/v1/networkdata').then(response => {
          let rawNetworkData = Object.keys(response.data[0].timeSeries).map(function(key) {
              return [Number(key), response.data[0].timeSeries[key]];
          });
          this.setState({
              NetworkData: rawNetworkData
          })
      })
  }

  handleDisplayedChartsChange(e) {
    let chartsTemp = this.state.charts;
    if(chartsTemp.includes(e)) {
      let index = chartsTemp.indexOf(e)
      chartsTemp.splice(index, 1);
    } else {
      chartsTemp.push(e);
    }
    this.setState({
      charts: chartsTemp
    })
  }

  render() {  
    const routeMaps = [
      ["DISK", "127.0.0.1:8080/api/v1/diskdata"],
      ["MEMORY", "127.0.0.1:8080/api/v1/memorydata"],
      ["CPU", "127.0.0.1:8080/api/v1/cpudata"],
      ["NETWORK","127.0.0.1:8080/api/v1/networkdata"]
    ];
    return (
      <div className="App">
        <ChartMat
        charts={this.state.charts}
        routeMaps={routeMaps}
        />
        <SideBar modifyDisplayedCharts={this.handleDisplayedChartsChange}/>
      </div>
    );
  }
}
