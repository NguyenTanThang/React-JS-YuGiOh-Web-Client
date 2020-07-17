import React, { Component } from 'react'

class Header extends Component {
    render() {
        const {imageURL, headerText} = this.props;

        return (
            <div className="header" style={{backgroundImage: `url(${imageURL})`}}>
                <h4 className="glitch-text" data-text={headerText}>{headerText}</h4>
            </div>
        )
    }
}

export default Header;
