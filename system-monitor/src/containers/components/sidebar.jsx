import React, {Component} from 'react';
import DisplayButton from '../../details/components/displaybutton'
import '../styles/sidebar.css';
import ChartData from '../../classes/ChartData'

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.swapHourlyDisplayState = this.swapHourlyDisplayState.bind(this);
    }

    handleChange(e) {
        this.props.modifyDisplayedCharts(e);
    }

    swapHourlyDisplayState() {
        this.props.swapHourlyDisplayState();
    }

    render() {
        const titles = ['CPU', 'MEMORY', 'DISK', 'NETWORK'];    
        const listItems = titles.map((title, i) =>
            <DisplayButton
            key={i} 
            title={title}
            onButtonClick={this.handleChange}
            />
        );
        return (
        <div className="collection z-depth-5">
            <img alt='' className="logo" src="http://www.thebluelizardlounge.com/Laughingbird%20Documents/Logo%20Libraries/Logo%20Templates/DevJakCody/Creative%20Pak%20Elements--fire-orb.png"/>
            <h3>Scryer</h3>
            {listItems}
            <div className="center">
                <div className="switch" >
                    <label className="toggle orange-text" >
                    Weekly Data
                    <input type="checkbox"/>
                    <span className="lever orange" onClick={this.swapHourlyDisplayState}></span>
                    Hourly Data
                    </label>
                </div>
            </div>
        </div>
        );
    }
}
