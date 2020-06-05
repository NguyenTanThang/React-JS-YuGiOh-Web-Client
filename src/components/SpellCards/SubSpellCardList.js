import React, { Component } from 'react';
import SpellCardItem from "./SpellCardItem";
import {Container} from "reactstrap";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import {alphabeticalOrderSorter} from "../../sorters/cardSorters";

class SubSpellCardList extends Component {

    state = {
        currentPage: 1,
        aphabeticalOrder: "A - Z"
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

        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        const pageObject = paginate(currentCards.length, currentPage, 5, 5)

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map(cardItem => {
            return <SpellCardItem isAll={false} cardItem={cardItem} key={cardItem._id}/>
        })

        return (
            <Container className="section-padding">
                <ul className="list-group">
                    {currentCards}
                </ul>

                <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
            </Container>
        )
    }
}

export default SubSpellCardList;
