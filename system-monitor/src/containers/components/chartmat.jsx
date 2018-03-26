import React, {Component} from 'react';
import '../styles/chartmat.css';
class ChartMat extends Component {
    render() {
        const xPos = [300,620,300, 620];
        const yPos = [50,50,360,360];
        const width = '50%';
        const height = '50%';
        const numbers = [1,2,3,4];
        const charts =  ['CPU']
        return(
            <div className="chartMat z-depth-5 black">
                <div class="row">
                <div class="col s12 m12">
                    <div class="card grey darken-1" style={{width: width, height: height, marginTop: yPos[0]}}>
                    <div class="card-content white-text z-depth-5">
                        <span class="card-title center-align">CPU USAGE BY TIME</span>
                    </div>
                    </div>
                </div>
                </div>  
            </div>
        );
    }
}

export default ChartMat;
