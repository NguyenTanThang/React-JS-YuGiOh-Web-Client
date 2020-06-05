import React, { Component } from 'react';
import {connect} from "react-redux";
import {dateParserWithMonth_ISODate} from "../../utils/dateParser";
import {Link} from "react-router-dom";

class DeckItem extends Component {

    render() {
        const {name, created_date, _id} = this.props.deckItem;

        return (
            <div className="card-item group-list-item">
                <div className="card-desc">
                    <h3><Link to={`/decks/details/${_id}`}>{name}</Link></h3>
                    <h6>Created Date: {dateParserWithMonth_ISODate(created_date)}</h6>
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
