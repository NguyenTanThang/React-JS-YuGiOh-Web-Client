import React, { Component } from 'react';
import {
    getAllCards
} from "../../actions/cardActions";
import {connect} from "react-redux";
import {
    getDecksByUserID
} from "../../actions/deckActions";
import {
    getAttributeByID
} from "../../fetchers/attributeFetchers";
import {
    getTypeByID
} from "../../fetchers/typeFetchers";
import {
    getCategoryByID
} from "../../fetchers/categoryFetchers";
import AssignMonsterCardToDeck from "./AssignMonsterCardToDeck";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import AssignMonsterToCategory from "./AssignMonsterToCategory";
import RemoveCardFromDeck from "./RemoveCardFromDeck";

class CardItem extends Component {

    state = {
        type: {},
        attribute: {},
        categoryList: [],
        loading: true
    }

    async componentDidMount() {
        this.props.getAllCards();
        const userID = localStorage.getItem("userID");
        this.props.getDecksByUserID(userID);
        const {typeID, attributeID, categoryIDs} = this.props.cardItem;
        let categoryList = [];
        for (let index = 0; index < categoryIDs.length; index++) {
            const categoryID = categoryIDs[index];
            const category = await getCategoryByID(categoryID);
            categoryList.push(category)
        }
        const type = await getTypeByID(typeID);
        const attribute = await getAttributeByID(attributeID);
        this.setState({
            type,
            attribute,
            categoryList,
            loading: false
        })
    }

    displayCardType = () => {
        const {type, loading} = this.state;
        if (loading) {
            return "Loading..."
        } else {
            return `Type ${type.name}`
        }
    }

    displayCardAttribute = () => {
        const {attribute, loading} = this.state;
        if (loading) {
            return <li>Loading...</li>
        } else {
            return <li><img className="img-fluid" alt={attribute.name} src={attribute.imageURL}/> {attribute.name}</li>
        }
    }

    displayCardCategories = () => {
        const {categoryList, loading} = this.state;
        if (loading) {
            return "Loading..."
        }
        if (categoryList.length === 0){
            return "N/A"
        }
        let cardCategories = [];
        for (let index = 0; index < categoryList.length; index++) {
            const categoryItem = categoryList[index];
            cardCategories.push(categoryItem.name);
            if (categoryList.length - index !== 1){
                cardCategories.push(" / ");
            }
        }
        return cardCategories
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
                    <AssignMonsterCardToDeck cardItem={this.props.cardItem}/>
                    <EditCard cardItem={cardItem}/>
                    <DeleteCard cardItem={cardItem}/>
                    <AssignMonsterToCategory cardItem={cardItem} />
                </div>
            )
        } 
        else if (!isAll && userID && deckID && owned) {
            return (
                <div className="item-utils-box">
                    <RemoveCardFromDeck cardItem={this.props.cardItem} deckID={deckID}/>
                </div>
            )
        }
        else {
            return (<></>)
        }
    }

    render() {
        const {name, description, levels, atk, def, imageURL} = this.props.cardItem;
        const {displayCardCategories, displayIndividualUtilsBox, displayCardType, displayCardAttribute} = this;

        return (
            <div className="card-item group-list-item">
                {displayIndividualUtilsBox()}
                <img className="img-fluid" alt={name} src={imageURL}/>
                <div className="card-desc">
                    <h4>{name}</h4>
                    <ul>
                        <li>{displayCardType()}</li>
                        <li>{displayCardCategories()}</li>
                        {displayCardAttribute()}
                        <li>Levels {levels}</li>
                        <li>ATK {atk}</li>
                        <li>DEF {def}</li>
                    </ul>
                    <div dangerouslySetInnerHTML={{__html: description}} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCards: () => {
            dispatch(getAllCards())
        },
        getDecksByUserID: (userID) => {
            dispatch(getDecksByUserID(userID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cardReducer.cards,
        userDecks: state.deckReducer.userDecks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
