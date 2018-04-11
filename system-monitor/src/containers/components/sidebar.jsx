import React, {Component} from 'react';
import DisplayButton from '../../details/components/displaybutton'
import '../styles/sidebar.css';
import ChartData from '../../classes/ChartData'

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.modifyDisplayedCharts(e);
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
        </div>
        );
    }
}

export default SideBar;
