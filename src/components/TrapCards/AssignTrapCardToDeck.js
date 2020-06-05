/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import {connect} from "react-redux";
import {
    getAllTrapCards
} from "../../actions/trapCardActions"; 
import {
    getDecksByUserID,
    assignTrapCardToDeck
} from "../../actions/deckActions"

class AssignTrapCardToDeck extends Component {
  
    state = {
        modal: false,
        cardID: "",
        deckID: ""
    }

    async componentDidMount(){
        this.props.getAllTrapCards();
        this.props.getDecksByUserID();
        this.setState({
            cardID: this.props.cardItem._id
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
        const {cardID, deckID} = this.state;
        this.props.assignTrapCardToDeck(cardID, deckID);
        this.setState({
            modal: false,
            deckID: "",
        })
    }

  displayCardOptions = () => {
    const cards = this.props.cards;
    
    return cards.map(cardItem => {
        return (
            <option key={cardItem._id} value={cardItem._id}>
                {cardItem.name}
            </option>
        )
    })
  }

  displayDeckOptions = () => {
    const decks = this.props.userDecks;
    
    return decks.map(cardItem => {
        return (
            <option key={cardItem._id} value={cardItem._id}>
                {cardItem.name}
            </option>
        )
    })
  }

render(){
    const {
        className
      } = this.props;
      const {toggle, displayCardOptions, displayDeckOptions, onChange, onSubmit} = this;
      const {modal, cardID, deckID} = this.state;

      return (
        <div>
          <Button color="dark" onClick={toggle}>
            <i className="fas fa-plus"></i>
          </Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Assign trapCardReducer Card To Deck</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>
    
                <FormGroup>
                    <Label htmlFor="cardID">Card:</Label>
                    <select defaultValue={cardID} id="cardID" name="cardID" required value={cardID} onChange={onChange} className="custom-select">
                        <option value={""} disabled>--Card--</option>
                        {displayCardOptions()}
                    </select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="deckID">Deck:</Label>
                    <select defaultValue={deckID} id="deckID" name="deckID" required value={deckID} onChange={onChange} className="custom-select">
                        <option value={""} disabled>--Deck--</option>
                        {displayDeckOptions()}
                    </select>
                </FormGroup>

                <FormGroup>
                    <Button type="submit" color="dark" block>Assign</Button>
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
        cards: state.trapCardReducer.cards,
        userDecks: state.deckReducer.userDecks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTrapCards: () => {
            dispatch(getAllTrapCards())
        },
        getDecksByUserID: () => {
            dispatch(getDecksByUserID())
        },
        assignTrapCardToDeck: (cardID, deckID) => {
            dispatch(assignTrapCardToDeck(cardID, deckID))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignTrapCardToDeck);
