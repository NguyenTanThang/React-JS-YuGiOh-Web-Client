import React, { Component } from 'react';
import { Label, Form, Container, Input, FormGroup, Button } from "reactstrap";
import {Link} from "react-router-dom";
import {
    login
} from "../../actions/userActions";
import {connect} from "react-redux";

class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        this.props.login(email, password)
        setTimeout(() => {
            const userID = localStorage.getItem("userID");
            if (userID) {
                this.props.history.push("/profile");
            }
        }, 1000)
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const {onSubmit, onChange} = this;
        const {email, password} = this.state;

        return (
            <Container className="section-padding">
            <div className="form-container">
                <h2 className="text-center">Login</h2>

                <Form onSubmit={onSubmit}>
                
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input id="email" name="email" required placeholder="Email" value={email} onChange={onChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="password">Password:</Label>
                        <Input type="password" id="password" name="password" required placeholder="Password" value={password} onChange={onChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="dark" block type="submit">Login</Button>
                        <Link to="/users/signup" className="btn btn-block btn-info">{"Don't have an account"}</Link>
                    </FormGroup>

                </Form>
            </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => {
            dispatch(login(email, password))
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);
