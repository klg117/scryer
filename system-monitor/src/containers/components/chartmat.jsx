import React, {Component} from 'react';
import '../styles/chartmat.css';
import ChartCard from '../../details/components/chartcard'
import axios from 'axios'

export default class ChartMat extends Component {
    render() {
        let numCharts = this.props.charts.length;
        let height = (100/(Math.sqrt(numCharts))) + '%';
        let width = (100/(Math.sqrt(numCharts))) + '%';
        this.props.charts.forEach(e => {
            console.log(e)
        })
        const chartsToDisplay = this.props.charts.map((e, i) =>
            <ChartCard
            key={i}
            width={width}
            height={height}
            title={e.title}
            route={this.props.charts[e.route]}
            chartId={'chart' + i}
            setChartData={this.setChartData}
            chartData={e}
            />
        );
        return(
            <div className="chartMat row z-depth-5 black">
                {chartsToDisplay}
            </div>
        );
    }
}
