import React, {Component} from 'react'

export default class DisplayButton extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.onButtonClick(this.props.title);
    }

    render() {
        return (
            <a className="collection-item orange white-text waves-effect btn-large" onClick={this.handleClick}>
            <i className="material-icons">memory</i>{this.props.title}</a>
        );
    }
}