import React, { Component } from 'react';
import {
    getAllCards
} from "../../actions/cardActions";
import {connect} from "react-redux";
import CardItem from "./CardItem";
import Header from "../Partials/Header";
import {Container, Button, FormGroup} from "reactstrap";
import {Link} from "react-router-dom";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import {monsterCardSorter, alphabeticalOrderSorter} from "../../sorters/cardSorters";
import MonsterCardSearchEngine from "./MonsterCardSearchEngine"

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

    setAlphabeticalOrder = (aphabeticalOrder) => {
        this.setState({
            aphabeticalOrder
        })
    }

    isSearchObjectEmpty = () => {
        const {searchObject} = this.state;
        const obj = searchObject;
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
              return false;
            }
          }
        
        return JSON.stringify(obj) === JSON.stringify({});
    }

    render() {
        const {cards} = this.props;
        
        const {currentPage, searchObject, aphabeticalOrder} = this.state;
        const {onSearch, clearSearchObject, isSearchObjectEmpty, setAlphabeticalOrder} = this;
        let currentCards = cards;

        currentCards = monsterCardSorter(currentCards, searchObject)
        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        const pageObject = paginate(currentCards.length, currentPage, 5, 3)

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
                    <MonsterCardSearchEngine isSearchObjectEmpty={isSearchObjectEmpty} onSearch={onSearch}setAlphabeticalOrder={setAlphabeticalOrder}/>
                    
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
