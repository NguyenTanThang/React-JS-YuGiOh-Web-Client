import React, { Component } from 'react'

class Header extends Component {
    render() {
        const {imageURL, headerText, authorName} = this.props;

        if (!authorName){
            return (
                <div className="header" style={{backgroundImage: `url(${imageURL})`}}>
                    <div className="header-content">
                        <h4 className="glitch-text" data-text={headerText}>{headerText}</h4>
                    </div>
                </div>
            )
        } else {
            const {username, avatarURL} = authorName;

            return (
                <div className="header" style={{backgroundImage: `url(${imageURL})`}}>
                    <div className="header-content">
                        <h4 className="glitch-text" data-text={headerText}>{headerText}</h4>
                        <h6>Created By</h6>
                        <div className="author">
                            <img src={avatarURL} alt={username+" avatar"}/>
                            <h5>{username}</h5>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

export default Header;
