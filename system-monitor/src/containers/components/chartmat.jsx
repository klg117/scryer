import React, {Component} from 'react';
import '../styles/chartmat.css';
import ChartCard from '../../details/components/chartcard'
import axios from 'axios'

export default class ChartMat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MemoryData: [],
        }
    }

    render() {
        let numCharts = this.props.charts.length;
        let height = (100/(Math.sqrt(numCharts))) + '%';
        let width = (100/(Math.sqrt(numCharts))) + '%';
        const chartsToDisplay = this.props.charts.map((e, i) =>
            <ChartCard
            key={i}
            width={width}
            height={height}
            title={e}
            route={this.props.routeMaps[e]}
            chardId={'chart' + i}
            setChartData={this.setChartData}
            />
        );
        return(
            <div className="chartMat row z-depth-5 black">
                {chartsToDisplay}
            </div>
        );
    }
}
