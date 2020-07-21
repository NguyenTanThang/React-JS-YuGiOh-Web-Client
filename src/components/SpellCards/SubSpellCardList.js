import React, { Component } from 'react';
import SpellCardItem from "./SpellCardItem";
import {Container, Button} from "reactstrap";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import {spellCardSorter, alphabeticalOrderSorter} from "../../sorters/cardSorters";
import SpellCardSearchEngine from "./SpellCardSearchEngine"

class SubSpellCardList extends Component {

    state = {
        currentPage: 1,
        aphabeticalOrder: "A - Z",
        searchObject: {}
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
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

    changeCurrentPage = (pageNum) => {
        this.setState({
            currentPage: pageNum
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

        const pageObject = paginate(currentCards.length, currentPage, 5, 4)

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map((cardItem, index) => {
            return <SpellCardItem deckID={deckID} isAll={false} cardItem={cardItem} key={`deck-spell-card-${currentPage}-${index}-${cardItem._id}`}/>
        })

        if (currentCards.length === 0) {
            return (
                <div className="section-padding text-center">
                    <h4>There is no spell card in this deck</h4>
                </div>
            )
        }

        return (
            <div className="section-padding">
                <div className="utils">
                    <SpellCardSearchEngine isSearchObjectEmpty={isSearchObjectEmpty} onSearch={onSearch} setAlphabeticalOrder={setAlphabeticalOrder}/>
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

export default SubSpellCardList;
