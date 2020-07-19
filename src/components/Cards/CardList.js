import React, { Component } from 'react';
import {
    getAllCards
} from "../../actions/cardActions";
import {
    getAllAttributes
} from "../../fetchers/attributeFetchers";
import {
    getAllTypes
} from "../../fetchers/typeFetchers";
import {
    getAllCategories
} from "../../fetchers/categoryFetchers";
import {connect} from "react-redux";
import CardItem from "./CardItem";
import Header from "../Partials/Header";
import {Container, Form, Input, Button, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {Link} from "react-router-dom";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import {monsterCardSorter, alphabeticalOrderSorter} from "../../sorters/cardSorters";

class MonsterCardSearchEngine extends Component {
  
    state = {
        modal: false,
        searched_name: "",
        attributeList: [],
        typeList: [],
        categoryList: [],
        categoryID: "",
        typeID: "",
        attributeID: "",
        min_atk: "",
        max_atk: "",
        min_def: "",
        max_def: "",
        min_levels: "",
        max_levels: "",
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
    const attributeList = await getAllAttributes();
    const typeList = await getAllTypes();
    const categoryList = await getAllCategories();
    localStorage.setItem("attributeList", JSON.stringify(attributeList))
    localStorage.setItem("typeList", JSON.stringify(typeList))
    localStorage.setItem("categoryList", JSON.stringify(categoryList))
    this.setState({
        attributeList,
        typeList,
        categoryList
    })
}

  toggle = () => {
    const {isSearchObjectEmpty} = this.props;

    if (!isSearchObjectEmpty){
        this.setState({
            searched_name: "",
            typeID: "",
            attributeID: "",
            categoryID: "",
            min_atk: "",
            max_atk: "",
            min_def: "",
            max_def: "",
            min_levels: "",
            max_levels: "",
            description: ""
        })
    }

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
        const {searched_name, typeID, attributeID, categoryID, min_atk, max_atk, min_def, max_def, min_levels, max_levels, description} = this.state;
        if (max_atk < min_atk || max_def < min_def || min_levels > max_levels) {
            console.log("Error")
        }
        this.props.onSearch({searched_name, typeID, attributeID,  min_atk, max_atk, min_def, max_def, min_levels, max_levels, description, categoryID})
        this.setState({
            modal: false
        })
    }

    onReset = (e) => {
        e.preventDefault();
        this.props.onSearch({})
        this.setState({
            searched_name: "",
            typeID: "",
            attributeID: "",
            categoryID: "",
            min_atk: "",
            max_atk: "",
            min_def: "",
            max_def: "",
            min_levels: "",
            max_levels: "",
            description: ""
        })
    }

    displayTypeOptions = () => {
        const {typeList} = this.state;

        return typeList.map(typeItem => {
            return (
                <option key={typeItem._id} value={typeItem._id}>{typeItem.name}</option>
            )
        })
    }

    displayAttributeOptions = () => {
        const {attributeList} = this.state;

        return attributeList.map(attributeItem => {
            return (
                <option key={attributeItem._id} value={attributeItem._id}>
                    {attributeItem.name}
                </option>
            )
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
      const {toggle, onChange, onSubmit, displayTypeOptions, displayAttributeOptions, onReset, displayCategoryOptions} = this;
      const {modal, searched_name, typeID, attributeID, min_atk, max_atk, min_def, max_def, min_levels, max_levels, description, categoryID} = this.state;


      return (
        <div>
          <Button color="dark" onClick={toggle}>Search Monster Cards</Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Search Monster Cards</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>
    
              <FormGroup>
              <Label htmlFor="searched_name">Searched Name:</Label>
              <Input id="searched_name" name="searched_name" placeholder="Name" value={searched_name} onChange={onChange}/>
          </FormGroup>

          <FormGroup className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                  <Label htmlFor="type">Type:</Label>
                  <select defaultValue={typeID} id="typeID" name="typeID" value={typeID} onChange={onChange} className="custom-select">
                      <option value={""} disabled>--Type--</option>
                      {displayTypeOptions()}
                  </select>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12">
                  <Label htmlFor="attribute">Attribute:</Label>
                  <select defaultValue={attributeID} id="attributeID" name="attributeID" value={attributeID} onChange={onChange} className="custom-select">
                      <option value={""} disabled>--Attribute--</option>
                      {displayAttributeOptions()}
                  </select>
              </div>
          </FormGroup>

          <FormGroup>
                    <Label htmlFor="categoryID">Category:</Label>
                    <select defaultValue={categoryID} id="categoryID" name="categoryID" value={categoryID} onChange={onChange} className="custom-select">
                        <option value={""} disabled>--Category--</option>
                        {displayCategoryOptions()}
                    </select>
                </FormGroup>

          <FormGroup className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                  <Label htmlFor="min_atk">Min ATK:</Label>
                  <Input type="number" id="min_atk" name="min_atk" placeholder="Min ATK" value={min_atk} onChange={onChange}/>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12">
                  <Label htmlFor="max_atk">Max ATK:</Label>
                  <Input type="number" id="max_atk" name="max_atk" placeholder="Max ATK" value={max_atk} onChange={onChange}/>
              </div>
          </FormGroup>

          <FormGroup className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                  <Label htmlFor="min_def">Min DEF:</Label>
                  <Input type="number" id="min_def" name="min_def" placeholder="Min DEF" value={min_def} onChange={onChange}/>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12">
                  <Label htmlFor="max_def">Max DEF:</Label>
                  <Input type="number" id="max_def" name="max_def" placeholder="Max DEF" value={max_def} onChange={onChange}/>
              </div>
          </FormGroup>


          <FormGroup className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                  <Label htmlFor="min_levels">Min Levels:</Label>
                  <Input type="number" id="min_levels" name="min_levels" placeholder="Min Levels" value={min_levels} onChange={onChange}/>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12">
                <Label htmlFor="max_levels">Max Levels:</Label>
                <Input type="number" id="max_levels" name="max_levels" placeholder="Max Levels" value={max_levels} onChange={onChange}/>
              </div>
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

    componentDidMount() {
        this.props.getAllCards();
    }

    changeCurrentPage = (pageNum) => {
        this.setState({
            currentPage: pageNum
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSearch = (searchObject) => {
        this.setState({
            searchObject
        })
    }

    clearSearchObject = () => {
        this.setState({
            searchObject: {}
        })
    }

    displayAphabeticalOrder = () => {
        const sortCriteria = ["A - Z", "Z - A", "Level - (High to Low)", "Level - (Low to High)", "ATK - (High to Low)", "ATK - (Low to High)", "DEF - (High to Low)", "DEF - (Low to High)", "By Attribute", "By Type", "By Category"]
        
        return (
            <>
                <option value={""} key={""} disabled>--Sorter--</option>
                {sortCriteria.map(sortItem => {
                    return <option value={sortItem} key={sortItem}>{sortItem}</option>
                })}
            </>
        )
    }

    isSearchObjectEmpty = () => {
        const {searchObject} = this.state;
        for(var key in searchObject) {
            if(searchObject.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {
        const {cards} = this.props;
        
        const {currentPage, searchObject, aphabeticalOrder} = this.state;
        const {onSearch, displayAphabeticalOrder, onChange, clearSearchObject, isSearchObjectEmpty} = this;
        let currentCards = cards;

        currentCards = monsterCardSorter(currentCards, searchObject)
        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        const pageObject = paginate(currentCards.length, currentPage, 5, 4)

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map(cardItem => {
            return <CardItem isAll={true} cardItem={cardItem} key={cardItem._id}/>
        })

        return (
        <div>
            <Header imageURL={"https://wallpaperaccess.com/full/1300535.jpg"} headerText={"MONSTER CARDS"}/>

            <Container className="section-padding">
                <div className="utils">
                    <Link to="/add-monster-card" className="btn btn-dark">
                        Add Monster Card
                    </Link>
                    <MonsterCardSearchEngine isSearchObjectEmpty={isSearchObjectEmpty} onSearch={onSearch}/>
                    <FormGroup>
                        <select defaultValue={aphabeticalOrder} id="aphabeticalOrder" name="aphabeticalOrder" required value={aphabeticalOrder} onChange={onChange} className="custom-select">
                            {displayAphabeticalOrder()}
                        </select>
                    </FormGroup>
                    {!isSearchObjectEmpty() ? <Button onClick={clearSearchObject}>Reset Search Criteria</Button> : <></>}
                </div>

                <ul className="list-group">
                    {currentCards}
                </ul>

                <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
            </Container>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCards: () => {
            dispatch(getAllCards())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cardReducer.cards,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
