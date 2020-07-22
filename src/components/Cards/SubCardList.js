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

class SubCardList extends Component {

    state = {
        currentPage: 1,
        searchObject: {},
        aphabeticalOrder: "A - Z"
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

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const deckID = this.props.deckID;
        const {cards} = this.props;
        const {currentPage, searchObject, aphabeticalOrder} = this.state;
        const {onSearch, clearSearchObject, isSearchObjectEmpty, setAlphabeticalOrder} = this;
        let currentCards = cards;

        currentCards = monsterCardSorter(currentCards, searchObject)
        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        let pageObject = paginate(currentCards.length, currentPage, 5, 3)
        if (pageObject.totalPages <= 6){
            pageObject = paginate(currentCards.length, currentPage, 5, 6)
        }

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map((cardItem, index) => {
            return <CardItem deckID={deckID} isAll={false} cardItem={cardItem} key={`deck-monster-card-${currentPage}-${index}-${cardItem._id}`}/>
        })

        if (currentCards.length === 0) {
            return (
                <div className="section-padding text-center">
                    <h4>There is no monster card in this deck</h4>
                </div>
            )
        }

        return (
            <div className="section-padding">
                <div className="utils">
                    <MonsterCardSearchEngine isSearchObjectEmpty={isSearchObjectEmpty} onSearch={onSearch}setAlphabeticalOrder={setAlphabeticalOrder}/>
                    
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

export default SubCardList;
