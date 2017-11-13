import React from 'react';

class DropDownStyle extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style,e.target.id);
            
        };
    }
    render() {

        let className = 'dropdownoption-default';
        if (this.props.active) {
            className += ' option-active';
        }
        let icon= "./images/"+this.props.icon;
        return (
            <li className={className} onMouseDown={this.onToggle} id={this.props.label}>
                {this.props.icon ?  <img src={icon}/> : this.props.label}

            </li>
        );
    }
}

export default DropDownStyle;