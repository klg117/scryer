import React, {Component} from 'react';
import '../styles/chartmat.css';
import ChartCard from '../../details/components/chartcard'
import axios from 'axios'

export default class ChartMat extends Component {
    render() {
        let numCharts = this.props.chartsToDisplay.length;
        let height = (100/(Math.sqrt(numCharts))) + '%';
        let width = (100/(Math.sqrt(numCharts))) + '%';
        const chartsToRender = Array.from(this.props.chartsToDisplay).map((e, i) =>
            <ChartCard
            key={i}
            width={width}
            height={height}
            title={e.title}
            chartId={'chart' + i}
            setChartData={this.setChartData}
            charts={e.title}
            chartData={this.props.chartData.get(e.title)}
            />
        );
        return(
            <div className="chartMat row z-depth-5 black">
                {chartsToRender}
            </div>
        );
    }
}
