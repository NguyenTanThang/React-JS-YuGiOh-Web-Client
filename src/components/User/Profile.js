import React, { Component } from 'react';
import DeckList from "../Decks/DeckList";
import {
    getDecksByUserID
} from "../../actions/deckActions";
import {connect} from "react-redux";

class Profile extends Component {

    componentDidMount() {
        this.props.getDecksByUserID();
    }

    render() {
        return (
            <div>
                <DeckList isAll={false} decks={this.props.userDecks}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDecksByUserID: () => {
            dispatch(getDecksByUserID())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userDecks: state.deckReducer.userDecks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
