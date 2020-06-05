import React, { Component } from 'react';
import DeckList from "../Decks/DeckList";
import {
    getAllDecks
} from "../../actions/deckActions";
import {connect} from "react-redux";

class AllDecks extends Component {

    componentDidMount() {
        this.props.getAllDecks();
    }

    render() {
        return (
            <div>
                <DeckList isAll={true} decks={this.props.decks}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDecks: () => {
            dispatch(getAllDecks())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        decks: state.deckReducer.decks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllDecks);
