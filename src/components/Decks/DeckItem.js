import React, { Component } from 'react';
import {connect} from "react-redux";
import {dateParserWithMonth_ISODate} from "../../utils/dateParser";
import {Link} from "react-router-dom";
import EditDeck from "./EditDeck";
import {
    getUserByID
} from "../../fetchers/userFetchers";

class DeckItem extends Component {

    state = {
        user: {},
        loading: true
    }

    async componentDidMount(){
        const userID = this.props.deckItem.userID;
        const user = await getUserByID(userID);
        this.setState({
            user,
            loading: false
        })
    }

    displayEditDeckButton = () => {
        const userID = localStorage.getItem("userID");
        const deckUserID = this.props.deckItem.userID;
        if (userID === deckUserID){
            return <EditDeck deckItem={this.props.deckItem} />
        } else {
            return <></>
        }
    }

    displayUser = () => {
        const {user, loading} = this.state;
        if (loading) {
            return "Loading..."
        } else {
            return user.username
        }
    }

    render() {
        const {name, created_date, _id} = this.props.deckItem;
        const {displayEditDeckButton, displayUser} = this;

        return (
            <div className="card-item group-list-item">
                <div className="card-desc">
                    <h3><Link to={`/decks/details/${_id}`}>{name}</Link></h3>
                    <h6>Created By: {displayUser()}</h6>
                    <h6>Created Date: {dateParserWithMonth_ISODate(created_date)}</h6>
                </div>
                <div className="item-utils-box" style={{marginTop: "10px"}}>
                    {displayEditDeckButton()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckItem);
