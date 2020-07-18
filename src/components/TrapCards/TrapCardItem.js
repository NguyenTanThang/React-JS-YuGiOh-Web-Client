import React, { Component } from 'react';
import {
    getAllTrapCards
} from "../../actions/trapCardActions";
import {
    getDecksByUserID
} from "../../actions/deckActions";
import {connect} from "react-redux";
import {
    getTrapCategoryByID
} from "../../fetchers/categoryFetchers";
import EditTrapCard from "./EditTrapCard";
import AssignTrapCardToDeck from "./AssignTrapCardToDeck";
import DeleteTrapCard from "./DeleteTrapCard";
import RemoveTrapCardFromDeck from "./RemoveTrapCardFromDeck";

class CardItem extends Component {

    state = {
        category: {},
        loading: true
    }

    async componentDidMount() {
        //this.props.getAllSpellCards();
        const userID = localStorage.getItem("userID");
        this.props.getDecksByUserID(userID);
        const {categoryID} = this.props.cardItem
        const category = await getTrapCategoryByID(categoryID);
        this.setState({
            category,
            loading: false
        })
    }

    displayTrapCardCategory = () => {
        const {category, loading} = this.state;
        if (loading) {
            return <ul>
                <li>Loading...</li>
            </ul>
        } else {
            return <ul>
                <li><img className="img-fluid" alt={category.name} src={"https://vignette.wikia.nocookie.net/yugioh/images/2/28/TRAP.svg/revision/latest/scale-to-width-down/300?cb=20120918121520"}/> Trap</li>
                <li><img className="img-fluid" alt={category.name} src={category.imageURL}/> {category.name}</li>
            </ul>
        }
    }

    displayIndividualUtilsBox = () => {
        const {isAll, cardItem, deckID, userDecks} = this.props;
        const owned = userDecks.some(userDeck => {
            return deckID === userDeck._id
            });
        const userID = localStorage.getItem("userID");
        if (isAll && userID){
            return (
                <div className="item-utils-box">
                    <AssignTrapCardToDeck cardItem={cardItem}/>
                    <EditTrapCard cardItem={cardItem}/>
                    <DeleteTrapCard cardItem={cardItem}/>
                </div>
            )
        } 
        else if (!isAll && userID && deckID && owned) {
            return (
                <div className="item-utils-box">
                    <RemoveTrapCardFromDeck cardItem={this.props.cardItem} deckID={deckID}/>
                </div>
            )
        }
        else {
            return (<></>)
        }
    }

    render() {
        const {name, description, imageURL, categoryID, _id} = this.props.cardItem;
        const {displayIndividualUtilsBox, displayTrapCardCategory} = this;

        return (
            <div className="card-item group-list-item trap">
                {displayIndividualUtilsBox()}
                <img className="img-fluid" alt={name} src={imageURL}/>
                <div className="card-desc">
                    <h4>{name}</h4>
                    {displayTrapCardCategory()}
                    <div dangerouslySetInnerHTML={{__html: description}} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTrapCards: () => {
            dispatch(getAllTrapCards())
        },
        getDecksByUserID: (userID) => {
            dispatch(getDecksByUserID(userID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.trapCardReducer.cards,
        userDecks: state.deckReducer.userDecks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
