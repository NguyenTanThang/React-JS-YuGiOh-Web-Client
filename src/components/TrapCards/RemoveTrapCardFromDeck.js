import React, { Component } from 'react';
import {
    removeTrapCardToDeck
} from "../../actions/deckActions";
import {connect} from "react-redux";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

class DeleteCard extends Component {

    state = {
        modal: false,
        name: "", 
    }

    async componentDidMount() {
        const {name} = this.props.cardItem;
        this.setState({
            name
        })
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        })
    }

    onDelete = (e) => {
        this.props.removeTrapCardToDeck(this.props.cardItem._id, this.props.deckID)
        this.setState({
            modal: false,
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 500)
    }

    render() {
        const {toggle, onDelete} = this;
        const {name, modal} = this.state;

        return (
            <div>
                <Button color="danger" onClick={toggle}>
                    <i className="fas fa-trash-alt"></i>
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Remove Card From Deck</ModalHeader>
                    <ModalBody>
                    
                        <div className="row details-row">
                            <div className='col-lg-4 col-md-6 col-sm-12 details-col-title'>
                                <h4>Name:</h4>
                            </div>
                            <div className='col-lg-8 col-md-6 col-sm-12 details-col-data'>
                                <p>{name}</p>
                            </div>
                        </div>

                        <div className="row details-row">
                            <div className='col-lg-4 col-md-6 col-sm-12 details-col-title'>
                                <h4>Are you sure?</h4>
                            </div>
                            <div className='col-lg-8 col-md-6 col-sm-12 details-col-data'>
                                <p>Do you want to delete this card? <br/>Once removed the card cannot be recovered</p>
                                <p>Upon removing you must reload the page to take effect</p>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={onDelete}>Yes</Button>
                        <Button color="secondary" onClick={toggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeTrapCardToDeck: (cardID, deckID) => {
            dispatch(removeTrapCardToDeck(cardID, deckID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cardReducer.cards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCard);
