import React, { Component } from 'react';
import CardItem from "./CardItem";
import {Container, FormGroup} from "reactstrap";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import {alphabeticalOrderSorter} from "../../sorters/cardSorters";

class SubCardList extends Component {

    state = {
        currentPage: 1,
        aphabeticalOrder: "A - Z"
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

    displayAphabeticalOrder = () => {
        return (
            <>
                <option value={""} key={""} disabled>--Aphabetical Order--</option>
                <option value={"A - Z"} key={"A - Z"}>{"A - Z"}</option>
                <option value={"Z - A"} key={"Z - A"}>{"Z - A"}</option>
            </>
        )
    }

    render() {
        const {cards} = this.props;
        const {currentPage, aphabeticalOrder} = this.state;
        const {displayAphabeticalOrder, onChange} = this;
        let currentCards = cards;
        const deckID = this.props.deckID;

        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        const pageObject = paginate(currentCards.length, currentPage, 5, 5)

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map((cardItem, index) => {
            return <CardItem deckID={deckID} isAll={false} cardItem={cardItem} key={index}/>
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
                <ul className="list-group">
                    {currentCards}
                </ul>

                <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
            </div>
        )
    }
}

export default SubCardList;
