/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from "react-redux";
import {
    getAllDecks,
    editDeck
} from "../../actions/deckActions";

class EditDeck extends Component {
  
    state = {
        modal: false,
        name: "",
    }

    async componentDidMount(){
        this.props.getAllDecks();
        const {deckItem} = this.props;
        const {name} = deckItem
        this.setState({
            name
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
        const {name} = this.state;
        this.props.editDeck(this.props.deckItem._id, name);
        this.setState({
            modal: false
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
          <Button color="warning" onClick={toggle}  className="up">
            <i className="fas fa-edit"></i>
          </Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Edit Deck</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>

                <FormGroup>
                    <Label htmlFor="name">Name:</Label>
                    <Input id="name" name="name" required placeholder="Name" value={name} onChange={onChange}/>
                </FormGroup>

                <FormGroup>
                    <Button type="submit" color="dark" block>Update</Button>
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
        decks: state.deckReducer.decks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDecks: () => {
            dispatch(getAllDecks())
        },
        editDeck: (deckID, name) => {
            dispatch(editDeck(deckID, name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck);
