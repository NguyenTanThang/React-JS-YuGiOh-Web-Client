import React, { Component } from 'react';
import {getDeckByID} from "../../actions/deckActions";
import {connect} from "react-redux";
import DeckTabs from "../Partials/DeckTabs";

class DeckDetails extends Component {

    state = {
        deck: {},
        spellCards: [],
        trapCards: [],
        monsterCards: []
    }

    componentDidMount() {
        const deckID = this.props.match.params.deckID
        this.props.getDeckByID(deckID);
        setTimeout(() => {
            const {deck, spellCards, trapCards, monsterCards} = this.props.deck;
            this.setState({
                deck, spellCards, trapCards, monsterCards
            })
        }, 2000)
    }

    render() {
        const {deck, spellCards, trapCards, monsterCards} = this.state;
        const deckID = this.props.match.params.deckID

        return (
            <div style={{marginBottom: "50px"}}>
                <div className="container utils text-center" style={{marginTop: "50px"}}>
                    <h2 className="text-center ml-auto mr-auto">{deck.name}</h2>
                </div>
                <DeckTabs deckID={deckID} spellCards={spellCards} trapCards={trapCards} monsterCards={monsterCards}/>
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
