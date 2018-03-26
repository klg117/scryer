import React, {Component} from 'react';
import '../styles/sidebar.css';

class SideBar extends Component {
    render() {
        const titles = ['CPU', 'MEMORY', 'DISK', 'NETWORK'];
        const listItems = titles.map((title) =>
            <a class="collection-item orange white-text"><i className="material-icons">memory</i>{title}</a>
        );
        return (
        <div className="collection z-depth-5">
            <img className="logo" src="http://www.thebluelizardlounge.com/Laughingbird%20Documents/Logo%20Libraries/Logo%20Templates/DevJakCody/Creative%20Pak%20Elements--fire-orb.png"/>
            <h3>Scryer</h3>
            {listItems}
        </div>
        );
    }
}

export default SideBar;
