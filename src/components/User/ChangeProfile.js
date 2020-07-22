/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from "react-redux";
import {
    changeProfile
} from "../../actions/userActions";
import {
    getCurrentUser
} from "../../fetchers/userFetchers";

class ChangeProfile extends Component {
  
    state = {
        modal: false,
        username: "",
        avatarURL: ""
    }

    async componentDidMount(){
        const currentUser = await getCurrentUser();
        const {username, avatarURL} = currentUser
        this.setState({
            username,
            avatarURL
        })
    }

  toggle = () => {
      this.setState({
        modal: !this.state.modal
      })
  }

  onChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
}

    onSubmit = (e) => {
        e.preventDefault();
        const {username, avatarURL} = this.state;
        this.props.changeProfile(username, avatarURL);
        this.setState({
            modal: false
        })
    }

render(){
    const {
        className
      } = this.props;
      const {toggle, onChange, onSubmit} = this;
      const {modal, username, avatarURL} = this.state;

      return (
        <div>
          <Button color="warning" onClick={toggle}>Edit Profile</Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>

                <FormGroup>
                    <Label htmlFor="username">Username:</Label>
                    <Input type="text" id="username" name="username" required placeholder="Username" value={username} onChange={onChange}/>
                </FormGroup>
    
                <FormGroup>
                    <Label htmlFor="avatarURL">Avatar URL:</Label>
                    <Input type="text" id="avatarURL" name="avatarURL" required placeholder="Avatar URL" value={avatarURL} onChange={onChange}/>
                </FormGroup>

                <FormGroup>
                    <Button type="submit" color="warning" block>Update</Button>
                </FormGroup>
              
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
}
  
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeProfile: (username, avatarURL) => {
            dispatch(changeProfile(username, avatarURL))
        }
    }
}

export default connect(null, mapDispatchToProps)(ChangeProfile);
