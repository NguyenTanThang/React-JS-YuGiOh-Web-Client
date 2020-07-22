import React, { Component } from 'react';
import { Label, Form, Container, Input, FormGroup, Button } from "reactstrap";
import {Link} from "react-router-dom";
import {
    changePassword
} from "../../actions/userActions";
import {connect} from "react-redux";

class ChangePassword extends Component {

    state = {
        oldPassword: "",
        newPassword: ""
    }

    componentDidMount() {
        const userID = localStorage.getItem("userID");
        if (!userID) {
            this.props.history.push("/");
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {oldPassword, newPassword} = this.state;
        this.props.changePassword(oldPassword, newPassword)
        this.setState({
            oldPassword: "",
            newPassword: ""
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const {onSubmit, onChange} = this;
        const {oldPassword, newPassword} = this.state;

        return (
            <div className="login-container">
        
                <h2 className="text-center">Change Password</h2>

                <Form onSubmit={onSubmit} id="login-form">
                
                    <FormGroup>
                        <div className="form-prefix">
                            <i className="fas fa-unlock-alt"></i>
                        </div>
                        <Input type="password" id="oldPassword" name="oldPassword" required placeholder="Old Password" value={oldPassword} onChange={onChange}/>
                    </FormGroup>

                    <FormGroup>
                        <div className="form-prefix">
                            <i className="fas fa-key"></i>
                        </div>
                        <Input type="password" id="newPassword" name="newPassword" required placeholder="New Password" value={newPassword} onChange={onChange}/>
                    </FormGroup>

                    <FormGroup className="d-flex flex-wrap">
                        <Button color="dark" block type="submit">Change Password</Button>
                        <Link to="/profile" className="btn btn-block btn-info">Back to Profile</Link>
                    </FormGroup>

                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (oldPassword, newPassword) => {
            dispatch(changePassword(oldPassword, newPassword))
        }
    }
}

export default connect(null, mapDispatchToProps)(ChangePassword);
