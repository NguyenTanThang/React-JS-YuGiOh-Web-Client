import React, { Component } from 'react';
import {connect} from "react-redux";
import {dateParserWithMonth_ISODate} from "../../utils/dateParser";
import {Link} from "react-router-dom";
import EditDeck from "./EditDeck";

class DeckItem extends Component {

    displayEditDeckButton = () => {
        const userID = localStorage.getItem("userID");
        const deckUserID = this.props.deckItem.userID;
        if (userID === deckUserID){
            return <EditDeck deckItem={this.props.deckItem} />
        } else {
            return <></>
        }
    }

    render() {
        const {name, created_date, _id} = this.props.deckItem;
        const {displayEditDeckButton} = this;

        return (
            <div className="card-item group-list-item">
                <div className="card-desc">
                    <h3><Link to={`/decks/details/${_id}`}>{name}</Link></h3>
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
