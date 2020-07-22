import React, { Component } from 'react';
import {
    getAllTrapCards
} from "../../actions/trapCardActions";
import {connect} from "react-redux";
import TrapCardItem from "./TrapCardItem";
import AddTrapCard from "./AddTrapCard";
import Header from "../Partials/Header";
import {Container,Button} from "reactstrap";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import {spellCardSorter, alphabeticalOrderSorter} from "../../sorters/cardSorters";
import TrapCardSearchEngine from "./TrapCardSearchEngine"

class CardList extends Component {

    state = {
        currentPage: 1,
        searchObject: {},
        aphabeticalOrder: "A - Z"
    }

    componentDidMount() {
        this.props.getAllTrapCards();
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

        currentCards = spellCardSorter(currentCards, searchObject)
        currentCards = alphabeticalOrderSorter(currentCards, aphabeticalOrder)

        let pageObject = paginate(currentCards.length, currentPage, 5, 3)
        if (pageObject.totalPages <= 6){
            pageObject = paginate(currentCards.length, currentPage, 5, 6)
        }

        currentCards = currentCards.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentCards = currentCards.map(cardItem => {
            return <TrapCardItem isAll={true} cardItem={cardItem} key={cardItem._id}/>
        })

        return (
            <div>
                <Header imageURL={"https://static.zerochan.net/Yu-Gi-Oh%21.The.Dark.Side.of.Dimensions.full.1995973.jpg"} headerText={"TRAP CARDS"}/>

            <Container className="section-padding">
                <div className="utils">
                    <AddTrapCard/>
                    <TrapCardSearchEngine isSearchObjectEmpty={isSearchObjectEmpty} onSearch={onSearch} setAlphabeticalOrder={setAlphabeticalOrder}/>

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
        getAllTrapCards: () => {
            dispatch(getAllTrapCards())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.trapCardReducer.cards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
