/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from "react-redux";
import {
    addDeck
} from "../../actions/deckActions";

class AddDeck extends Component {
  
    state = {
        modal: false,
        name: ""
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
        const {name} = this.state;
        this.props.addDeck(name);
        this.setState({
            modal: false,
            name: ""
        })
    }

render(){
    const {
        className
      } = this.props;
      const {toggle, onChange, onSubmit} = this;
      const {modal, name} = this.state;

      return (
        <div>
          <Button color="dark" onClick={toggle}>Create Deck</Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Create New Deck</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>

                <FormGroup>
                    <Label htmlFor="name">Name:</Label>
                    <Input id="name" name="name" required placeholder="Name" value={name} onChange={onChange}/>
                </FormGroup>
    
                <FormGroup>
                    <Button type="submit" color="dark" block>Create</Button>
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

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDeck: (name) => {
            dispatch(addDeck(name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
