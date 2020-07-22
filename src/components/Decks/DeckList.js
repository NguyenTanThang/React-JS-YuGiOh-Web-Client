import React, { Component } from 'react';
import {
    getDecksByUserID
} from "../../actions/deckActions";
import {connect} from "react-redux";
import {Container, Form, Input, Button, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {Link} from "react-router-dom";
import DeckItem from "./DeckItem";
import Header from "../Partials/Header";
import AddDeck from "./AddDeck";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
import ChangeProfile from "../User/ChangeProfile";
 
class DeckList extends Component {

    state = {
        currentPage: 1
    }

    /*
    componentDidMount() {
        this.props.getDecksByUserID();
    }
    */

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

    displayUtilsBox = (e) => {
        const {isAll} = this.props;
        if (isAll) {
            return (
                <div className="utils">
                    <Link to="/profile" className="btn btn-info">View Your Decks</Link>
                </div>
            )
        } else {
            return (
                <div className="utils">
                    <AddDeck/>
                    <Link to="/decks/all" className="btn btn-info">View All Decks</Link>
                    <Link to="/users/change-password" className="btn btn-light">Change Password</Link>
                    <ChangeProfile/>
                </div>
            )
        }
    }

    onSearch = (searchObject) => {
        this.setState({
            searchObject
        })
    }

    render() {
        const {decks} = this.props;
        const {currentPage} = this.state;
        const {displayUtilsBox} = this;
        let currentDecks = decks;

        const pageObject = paginate(currentDecks.length, currentPage, 5, 5)

        currentDecks = currentDecks.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentDecks = currentDecks.map(deckItem => {
            return <DeckItem deckItem={deckItem} key={deckItem._id}/>
        })

        if (currentDecks.length === 0){
            return (
                <div>
                    <Header imageURL={"https://wallpapercave.com/wp/WrJR9yU.jpg"} headerText={"DECK LIST"}/>

                    <Container className="section-padding">
                        {displayUtilsBox()}

                        <h4 className="text-center">Currently there is no deck</h4>
                    </Container>
                </div>
            )
        } else {
            return (
                <div>
                    <Header imageURL={"https://wallpapercave.com/wp/WrJR9yU.jpg"} headerText={"DECK LIST"}/>
    
                    <Container className="section-padding">
                        {displayUtilsBox()}
    
                        <ul className="list-group">
                            {currentDecks}
                        </ul>
    
                        <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
                    </Container>
                </div>
            )
        }
    }
}

export default (DeckList);
