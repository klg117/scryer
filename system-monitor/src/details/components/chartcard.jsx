import React, {Component} from 'react';
import '../styles/chartcard.css';
import GoogleLineChart from '../../chartcomponents/components/googlelinechart';

export default class ChartCard extends Component {
    render() {
        return (
            <div className="card black darken-1 chartCard col s2 center-align" style={{width: this.props.width, height: this.props.height}}>
                <div className="card-content white-text z-depth-5">
                    <span className="card-title center-align">{this.props.title}</span>
                </div>
                <GoogleLineChart 
                chartId={this.props.chartId}
                chartData={this.props.chartData}
                hourlyData={this.props.hourlyData}/>
            </div>
        );
    }
}
