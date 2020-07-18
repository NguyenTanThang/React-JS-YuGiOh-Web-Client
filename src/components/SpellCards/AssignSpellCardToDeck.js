/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import {connect} from "react-redux";
import {
    getAllSpellCards
} from "../../actions/spellCardActions"; 
import {
    getDecksByUserID,
    assignSpellCardToDeck
} from "../../actions/deckActions"

class AssignSpellCardToDeck extends Component {
  
    state = {
        modal: false,
        cardID: "",
        deckID: ""
    }

    async componentDidMount(){
        this.props.getAllSpellCards();
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
        this.props.assignSpellCardToDeck(cardID, deckID);
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
          <Button color="dark" onClick={toggle} className="up">
            <i className="fas fa-plus"></i>
          </Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Assign Spell Card To Deck</ModalHeader>
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
        cards: state.spellCardReducer.cards,
        userDecks: state.deckReducer.userDecks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpellCards: () => {
            dispatch(getAllSpellCards())
        },
        getDecksByUserID: () => {
            dispatch(getDecksByUserID())
        },
        assignSpellCardToDeck: (cardID, deckID) => {
            dispatch(assignSpellCardToDeck(cardID, deckID))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignSpellCardToDeck);
