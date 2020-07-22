/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import {connect} from "react-redux";
import {
    getAllCards,
    assignMonsterToCategory
} from "../../actions/cardActions";
import {
    getAllCategories
} from "../../fetchers/categoryFetchers";

class AssignMonsterToCategory extends Component {
  
    state = {
        modal: false,
        cardID: "",
        categoryID: "",
        categoryList: []
    }

    async componentDidMount(){
        this.props.getAllCards();
        const {cardItem} = this.props;
        const categoryList = await getAllCategories();
        this.setState({
            cardID: cardItem._id,
            categoryList
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
        const {cardID, categoryID} = this.state;
        this.props.assignMonsterToCategory(cardID, categoryID);
        this.setState({
            modal: false,
            categoryID: "",
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

  displayCategoryOptions = () => {
    let categoryList = this.state.categoryList;
    const cards = this.props.cards;
    const cardID = this.props.cardItem.cardID;

    if (cardID) {
        const card = cards.filter(cardItem => {
            return cardItem._id === cardID;
        })[0];

        categoryList.filter(categoryItem => {
            return !card.categoryIDs.includes(categoryItem._id);
        })
        
        return categoryList.map(categoryItem => {
                return (
                    <option key={categoryItem._id} value={categoryItem._id}>
                        {categoryItem.name}
                    </option>
                )
        })
    }

    return categoryList.map(categoryItem => {
        return (
            <option key={categoryItem._id} value={categoryItem._id}>
                {categoryItem.name}
            </option>
        )
    })
  }

render(){
    const {
        className
      } = this.props;
      const {toggle, displayCardOptions, displayCategoryOptions, onChange, onSubmit} = this;
      const {modal, cardID, categoryID} = this.state;

      return (
        <div>
          <Button color="dark" onClick={toggle} className="up">
            <i className="fas fa-th-large"></i>
          </Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Assign Monster To Category</ModalHeader>
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
                    <Label htmlFor="categoryID">Category:</Label>
                    <select defaultValue={categoryID} id="categoryID" name="categoryID" required value={categoryID} onChange={onChange} className="custom-select">
                        <option value={""} disabled>--Category--</option>
                        {displayCategoryOptions()}
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
        cards: state.cardReducer.cards
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCards: () => {
            dispatch(getAllCards())
        },
        assignMonsterToCategory: (cardID, categoryID) => {
            dispatch(assignMonsterToCategory(cardID, categoryID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignMonsterToCategory);
