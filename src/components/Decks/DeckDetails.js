import React, { Component } from 'react';
import {getDeckByID} from "../../actions/deckActions";
import {connect} from "react-redux";
import DeckTabs from "../Partials/DeckTabs";
import Header from "../Partials/Header";
import Loading from "../Partials/Loading";
import { Link } from 'react-router-dom';
import {
    getUserByID
} from "../../fetchers/userFetchers";

class DeckDetails extends Component {

    state = {
        deck: {},
        spellCards: [],
        trapCards: [],
        monsterCards: [],
        user: {},
        loading: true
    }

    componentDidMount() {
        const deckID = this.props.match.params.deckID
        this.props.getDeckByID(deckID);

        /*
        console.log(this.props.deck);
            const {deck, spellCards, trapCards, monsterCards} = this.props.deck;
            this.setState({
                deck, spellCards, trapCards, monsterCards
            })
        */

        setTimeout(() => {
            console.log(this.props.deck);
            const {deck, spellCards, trapCards, monsterCards, user} = this.props.deck;
            this.setState({
                deck, spellCards, trapCards, monsterCards,
                user,
                loading: false
            })
        }, 3000)
    }

    render() {
        const {deck, spellCards, trapCards, monsterCards, loading, user} = this.state;
        const deckID = this.props.match.params.deckID;

        if (loading) {
            return <Loading/>
        }

        return (
            <div>
                <Header imageURL={"https://wallpapercave.com/wp/WrJR9yU.jpg"} headerText={`DECK NAME: "${deck.name}"`} authorName={user}/>
                <div className="container" style={{marginBottom: "50px", marginTop: "50px"}}>
                    <div className="utils">
                        <Link className="btn btn-info" to="/profile">Back</Link>
                    </div>

                    <DeckTabs deckID={deckID} spellCards={spellCards} trapCards={trapCards} monsterCards={monsterCards}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDeckByID: (deckID) => {
            dispatch(getDeckByID(deckID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        deck: state.deckReducer.deck
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
