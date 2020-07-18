import React, { Component } from 'react';
import TrapCardItem from "./TrapCardItem";
import {Container} from "reactstrap";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import {alphabeticalOrderSorter} from "../../sorters/cardSorters";

class CardList extends Component {

    state = {
        currentPage: 1,
        aphabeticalOrder: "A -  Z"
    }

    changeCurrentPage = (pageNum) => {
        this.setState({
            currentPage: pageNum
        })
    }

    render() {
        const {cards} = this.props;
        const {currentPage, aphabeticalOrder} = this.state;
        let currentCards = cards;
        const deckID = this.props.deckID;

        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        const pageObject = paginate(currentCards.length, currentPage, 5, 4)

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map((cardItem, index) => {
            return <TrapCardItem deckID={deckID} cardItem={cardItem} key={`deck-trap-card-${currentPage}-${index}`}/>
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
                <ul className="list-group">
                    {currentCards}
                </ul>

                <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
            </div>
        )
    }
}

export default CardList;
