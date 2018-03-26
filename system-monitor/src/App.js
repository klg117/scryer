import React, { Component } from 'react'
import './App.css'
import SideBar from './containers/components/sidebar'
import ChartMat from './containers/components/chartmat'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChartMat />
        <SideBar />
      </div>
    );
  }
}

export default App;
