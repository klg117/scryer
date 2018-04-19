import React, {Component} from 'react'
import '../styles/chartcard.css';
import GoogleLineChart from '../../chartcomponents/components/googlelinechart'

export default class ChartCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartDataToDisplay: [],
            chartDataPartial: [],
        }
    }

    componentDidMount() {
        this.setState({
            
        })
        this.computePartialData();
    }

    computePartialData() {
        let partialData = [];
        for (let i = 10020; i < 10080; i++) {
            partialData.push(this.props.chartData[i]);
        }
    }

    swapDataDisplay() {
        let chartDataFull = this.props.chartData;
        if (this.state.chartDataToDisplay.length > 60) {
            console.log('swapped to partial')
            this.setState((prevState) => {
                chartDataToDisplay: prevState.chartDataPartial
            })
        } else {
            console.log('swapped to full')
            this.setState({
                chartDataToDisplay: chartDataFull
            })
        }
    }

    render() {
        return (
            <div className="card black darken-1 chartCard col s2" style={{width: this.props.width, height: this.props.height}}>
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
