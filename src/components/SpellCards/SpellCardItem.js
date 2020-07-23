import React, { Component } from 'react';
import {
    getAllSpellCards
} from "../../actions/spellCardActions";
import {
    getDecksByUserID
} from "../../actions/deckActions";
import {connect} from "react-redux";
import {
    getSpellCategoryByID
} from "../../fetchers/categoryFetchers";
import EditSpellCard from "./EditSpellCard";
import AssignSpellCardToDeck from "./AssignSpellCardToDeck";
import DeleteSpellCard from "./DeleteSpellCard";
import RemoveSpellCardFromDeck from "./RemoveSpellCardFromDeck";

class SpellCardItem extends Component {

    state = {
        category: {},
        loading: true
    }

    async componentDidMount() {
        //this.props.getAllSpellCards();
        const userID = localStorage.getItem("userID");
        this.props.getDecksByUserID(userID);
        const {categoryID} = this.props.cardItem
        const category = await getSpellCategoryByID(categoryID);
        this.setState({
            category,
            loading: false
        })
    }

    displaySpellCardCategory = () => {
        const {category, loading} = this.state;
        if (loading) {
            return <ul>
                <li>Loading...</li>
            </ul>
        } else {
            return <ul>
                <li><img className="img-fluid" alt={category.name} src={"https://vignette.wikia.nocookie.net/yugioh/images/0/09/SPELL.svg/revision/latest/scale-to-width-down/300?cb=20120918121429"}/> Spell</li>
                <li><img className="img-fluid" alt={category.name} src={category.imageURL}/> {category.name}</li>
            </ul>
        }
    }

    displayIndividualUtilsBox = () => {
        const {isAll, cardItem, deckID, userDecks} = this.props;
        const userID = localStorage.getItem("userID");
        const owned = userDecks.some(userDeck => {
            return deckID === userDeck._id
            });
        if (isAll && userID){
            return (
                <div className="item-utils-box">
                    <AssignSpellCardToDeck cardItem={cardItem}/>
                    <EditSpellCard cardItem={cardItem}/>
                    <DeleteSpellCard cardItem={cardItem}/>
                </div>
            )
        } 
        else if (!isAll && userID && deckID && owned) {
            return (
                <div className="item-utils-box">
                    <RemoveSpellCardFromDeck cardItem={this.props.cardItem} deckID={deckID}/>
                    <EditSpellCard cardItem={cardItem}/>
                </div>
            )
        }
        else if (!isAll && userID && deckID) {
            return (
                <div className="item-utils-box">
                    <RemoveSpellCardFromDeck cardItem={this.props.cardItem} deckID={deckID}/>
                    <EditSpellCard cardItem={cardItem}/>
                </div>
            )
        }
        else {
            return (<></>)
        }
    }

    render() {
        const {name, description, imageURL} = this.props.cardItem;
        const {displayIndividualUtilsBox, displaySpellCardCategory} = this;

        return (
            <div className="card-item group-list-item spell">
                {displayIndividualUtilsBox()}
                <img className="img-fluid" alt={name} src={imageURL}/>
                <div className="card-desc">
                    <a href={imageURL} target="_blank" alt={`${name}'s image`}>
                        <h4>{name}</h4>
                    </a>
                    {displaySpellCardCategory()}
                    <div dangerouslySetInnerHTML={{__html: description}} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpellCards: () => {
            dispatch(getAllSpellCards())
        },
        getDecksByUserID: (userID) => {
            dispatch(getDecksByUserID(userID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.spellCardReducer.cards,
        userDecks: state.deckReducer.userDecks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellCardItem);
