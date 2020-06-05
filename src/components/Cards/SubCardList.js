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

        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        const pageObject = paginate(currentCards.length, currentPage, 5, 5)

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map(cardItem => {
            return <CardItem isAll={false} cardItem={cardItem} key={cardItem._id}/>
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

export default SubCardList;
