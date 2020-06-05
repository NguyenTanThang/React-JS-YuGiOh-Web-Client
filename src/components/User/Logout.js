import React, { Component } from 'react';
import {
    logout
} from "../../actions/userActions";
import {connect} from "react-redux";

class Logout extends Component {

    componentDidMount() {
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
}

export default connect(null, mapDispatchToProps)(Logout);
