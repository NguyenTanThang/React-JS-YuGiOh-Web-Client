import React, { Component } from 'react';
import {
    getAllSpellCards
} from "../../actions/spellCardActions";
import {connect} from "react-redux";
import SpellCardItem from "./SpellCardItem";
import AddSpellCard from "./AddSpellCard";
import Header from "../Partials/Header";
import {Container, Button} from "reactstrap";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import {spellCardSorter, alphabeticalOrderSorter} from "../../sorters/cardSorters";
import SpellCardSearchEngine from "./SpellCardSearchEngine"

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

    clearSearchObject = () => {
        this.setState({
            searchObject: {}
        })
    }

    render() {
        const {cards} = this.props;
        const {currentPage, searchObject, aphabeticalOrder} = this.state;
        const {onSearch, isSearchObjectEmpty, clearSearchObject, setAlphabeticalOrder} = this;
        let currentCards = cards;

        currentCards = spellCardSorter(currentCards, searchObject)
        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        let pageObject = paginate(currentCards.length, currentPage, 5, 3)
        if (pageObject.totalPages <= 6){
            pageObject = paginate(currentCards.length, currentPage, 5, 6)
        }

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map(cardItem => {
            return <SpellCardItem isAll={true} cardItem={cardItem} key={cardItem._id}/>
        })

        return (
            <div>
                <Header imageURL={"https://steamuserimages-a.akamaihd.net/ugc/764984402033230210/0FDBEB551147EA8E6A3032D7153BBF0428950BDD/"} headerText={"SPELL CARDS"}/>

            <Container className="section-padding">
                <div className="utils">
                    <AddSpellCard/>
                    <SpellCardSearchEngine isSearchObjectEmpty={isSearchObjectEmpty} onSearch={onSearch} setAlphabeticalOrder={setAlphabeticalOrder}/>
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
