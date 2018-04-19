import React, {Component} from 'react';
import '../styles/chartmat.css';
import ChartCard from '../../details/components/chartcard'
import axios from 'axios'

export default class ChartMat extends Component {
    componentDidUpdate() {
        this.render();
    }

    render() {
        console.log(this.props.hourlyData)
        let numCharts = this.props.chartsToDisplay.size;
        let height = (75/(Math.sqrt(numCharts))) + '%';
        let width = (75/(Math.sqrt(numCharts))) + '%';
        const chartsToRender = Array.from(this.props.chartsToDisplay).map((chartData, i) =>
        <ChartCard
        key={i}
        width={width}
        height={height}
        title={chartData[1].title}
        chartId={'chart' + i}
        charts={chartData[1].title}
        chartData={chartData[1].data}
        />
        );
        const chartsToRenderPartial = Array.from(this.props.chartsToDisplay).map((chartData, i) =>
            <ChartCard
            key={i}
            width={width}
            height={height}
            title={chartData[1].title}
            chartId={'chart' + i}
            charts={chartData[1].title}
            chartData={chartData[1].partialData}
            hourlyData= {this.props.hourlyData}
            />
        );
        if (this.props.hourlyData) {
            return(
                <div className="chartMat row z-depth-5 black">
                    {chartsToRenderPartial}
                </div>
            );
        } else {
            return(
                <div className="chartMat row z-depth-5 black">
                    {chartsToRender}
                </div>
            );
        }
    }
}
