import React, { Component } from 'react';
import {
    getAllSpellCards
} from "../../actions/spellCardActions";
import {
    getSpellCategories
} from "../../fetchers/categoryFetchers";
import {connect} from "react-redux";
import SpellCardItem from "./SpellCardItem";
import AddSpellCard from "./AddSpellCard";
import {Container, Form, Input, Button, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import {spellCardSorter, alphabeticalOrderSorter} from "../../sorters/cardSorters";

class SpellCardSearchEngine extends Component {
  
    state = {
        modal: false,
        searched_name: "",
        categoryList: [],
        categoryID: "",
        description: ""
    }

    /*
    async componentDidMount(){
        this.props.getAllCards();
        const categoryList = await getAllCategories();
        this.setState({
            categoryList
        })
    }
    */

   async componentDidMount() {
    //this.props.getAllSpellCards();
    const categoryList = await getSpellCategories();
    this.setState({
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
        const {searched_name, categoryID, description} = this.state;
        this.props.onSearch({searched_name, categoryID, description})
        this.setState({
            modal: false
        })
    }

    onReset = (e) => {
        e.preventDefault();
        this.props.onSearch({})
        this.setState({
            searched_name: "",
            categoryID: "",
            description: ""
        })
    }

    displayCategoryOptions = () => {
        let categoryList = this.state.categoryList;
    
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
      const {toggle, onChange, onSubmit, onReset, displayCategoryOptions} = this;
      const {modal, searched_name, description, categoryID} = this.state;

      return (
        <div>
          <Button color="dark" onClick={toggle}>Search Spell Cards</Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Search Spell Cards</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>
    
              <FormGroup>
              <Label htmlFor="searched_name">Searched Name:</Label>
              <Input id="searched_name" name="searched_name" placeholder="Name" value={searched_name} onChange={onChange}/>
          </FormGroup>

          <FormGroup>
                    <Label htmlFor="categoryID">Category:</Label>
                    <select defaultValue={categoryID} id="categoryID" name="categoryID" value={categoryID} onChange={onChange} className="custom-select">
                        <option value={""} disabled>--Category--</option>
                        {displayCategoryOptions()}
                    </select>
                </FormGroup>

          <FormGroup>
              <Label htmlFor="description">Card Text:</Label>
              <textarea id="description" name="description" placeholder="Card Text" value={description} onChange={onChange} className="form-control" rows="5"></textarea>
          </FormGroup>

                <FormGroup>
                    <Button type="submit" color="dark" block>Search</Button>
                    <Button type="reset" color="info" onClick={onReset} block>Reset</Button>
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

class CardList extends Component {

    state = {
        currentPage: 1,
        searchObject: {},
        aphabeticalOrder: "A - Z"
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    displayAphabeticalOrder = () => {
        return (
            <>
                <option value={""} key={""} disabled>--Aphabetical Order--</option>
                <option value={"A - Z"} key={"A - Z"}>{"A - Z"}</option>
                <option value={"Z - A"} key={"Z - A"}>{"Z - A"}</option>
            </>
        )
    }

    componentDidMount() {
        this.props.getAllSpellCards();
    }

    changeCurrentPage = (pageNum) => {
        this.setState({
            currentPage: pageNum
        })
    }

    onSearch = (searchObject) => {
        this.setState({
            searchObject
        })
    }

    render() {
        const {cards} = this.props;
        const {currentPage, searchObject, aphabeticalOrder} = this.state;
        const {onSearch, displayAphabeticalOrder, onChange} = this;
        let currentCards = cards;

        currentCards = spellCardSorter(currentCards, searchObject)
        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        const pageObject = paginate(currentCards.length, currentPage, 5, 5)

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map(cardItem => {
            return <SpellCardItem cardItem={cardItem} key={cardItem._id}/>
        })

        return (
            <Container className="section-padding">
                <div className="utils">
                    <AddSpellCard/>
                    <SpellCardSearchEngine onSearch={onSearch}/>
                    <FormGroup>
                        <select defaultValue={aphabeticalOrder} id="aphabeticalOrder" name="aphabeticalOrder" required value={aphabeticalOrder} onChange={onChange} className="custom-select">
                            {displayAphabeticalOrder()}
                        </select>
                    </FormGroup>
                </div>

                <ul className="list-group">
                    {currentCards}
                </ul>

                <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpellCards: () => {
            dispatch(getAllSpellCards())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.spellCardReducer.cards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
