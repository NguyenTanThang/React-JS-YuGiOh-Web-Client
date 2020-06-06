import React, { Component } from 'react';
import { Label, Form, Container, Input, FormGroup, Button } from "reactstrap";
import {Link} from "react-router-dom";
import {
    signup
} from "../../actions/userActions";
import {connect} from "react-redux";

class Signup extends Component {

    state = {
        username: "",
        email: "",
        password: ""
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {username, email, password} = this.state;
        this.props.signup(username, email, password)
        setTimeout(() => {
            const userID = localStorage.getItem("userID");
            if (userID) {
                this.props.history.push("/profile");
            }
        }, 1500)
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const {onSubmit, onChange} = this;
        const {username, email, password} = this.state;

        return (
            <Container className="section-padding">
            <div className="form-container">
                <h2 className="text-center">SignUp</h2>

                <Form onSubmit={onSubmit}>
                
                    <FormGroup>
                        <Label htmlFor="username">Username:</Label>
                        <Input id="username" name="username" required placeholder="Username" value={username} onChange={onChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input id="email" name="email" required placeholder="Email" value={email} onChange={onChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="password">Password:</Label>
                        <Input id="password" name="password" required placeholder="Password" value={password} type="password" onChange={onChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="dark" block type="submit">Signup</Button>
                        <Link to="/users/login" className="btn btn-block btn-info">Already have an account</Link>
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
        signup: (username, email, password) => {
            dispatch(signup(username, email, password))
        }
    }
}

export default connect(null, mapDispatchToProps)(Signup);
