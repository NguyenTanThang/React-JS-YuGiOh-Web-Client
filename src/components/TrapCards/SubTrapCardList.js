import React, { Component } from 'react';
import TrapCardItem from "./TrapCardItem";
import {Container, Button} from "reactstrap";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import {spellCardSorter, alphabeticalOrderSorter} from "../../sorters/cardSorters";
import TrapCardSearchEngine from "./TrapCardSearchEngine"

class CardList extends Component {

    state = {
        currentPage: 1,
        searchObject: {},
        aphabeticalOrder: "A -  Z"
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

    setAlphabeticalOrder = (aphabeticalOrder) => {
        this.setState({
            aphabeticalOrder
        })
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
        const deckID = this.props.deckID;

        currentCards = spellCardSorter(currentCards, searchObject)
        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        let pageObject = paginate(currentCards.length, currentPage, 5, 3)
        if (pageObject.totalPages <= 6){
            pageObject = paginate(currentCards.length, currentPage, 5, 6)
        }

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map((cardItem, index) => {
            return <TrapCardItem deckID={deckID} cardItem={cardItem} key={`deck-trap-card-${currentPage}-${index}-${cardItem._id}`}/>
        })

        if (currentCards.length === 0) {
            return (
                <div className="section-padding text-center">
                    <h4>There is no trap card in this deck</h4>
                </div>
            )
        }

        return (
            <div className="section-padding">
                <div className="utils">
                    <TrapCardSearchEngine isSearchObjectEmpty={isSearchObjectEmpty} onSearch={onSearch} setAlphabeticalOrder={setAlphabeticalOrder}/>

                    {!isSearchObjectEmpty() ? <Button onClick={clearSearchObject}>Reset Search Criteria</Button> : <></>}
                </div>

                <ul className="list-group">
                    {currentCards}
                </ul>

                <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
            </div>
        )
    }
}

export default CardList;
