import React from 'react';

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    render() {

        let className = 'option-wrapper';
        if (this.props.active) {
            className += ' option-active';
        }
        let icon= "./images/"+this.props.icon;
        return (
            <div className={className} onMouseDown={this.onToggle}>
                {this.props.icon ?  <img src={icon}/> : this.props.label}

        </div>
        );
    }
}

export default StyleButton;