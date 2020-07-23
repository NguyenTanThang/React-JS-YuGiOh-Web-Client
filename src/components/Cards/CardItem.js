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
        loading: true,
        link: false,
        pendulum: false
    }

    async componentWillMount() {
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
        if (categoryIDs.includes("5eccabefb428ef32144ccd55")){
            this.setState({
                link: true
            })
        }
        if (categoryIDs.includes("5eccabefb428ef32144ccd54")){
            this.setState({
                pendulum: true
            })
        }
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

    displayCardLevels = () => {
        const {levels} = this.props.cardItem;
        const {link} = this.state;

        if (link){
            return (
                <li>Link {levels}</li>
            )
        } else {
            return (
                <li>Levels {levels}</li>
            )
        }
    }

    displayCardPendulumScale = () => {
        const {pendulumScale} = this.props.cardItem;
        const {pendulum} = this.state;

        if (pendulum && !pendulumScale) {
            return (
                <li style={{flex: "1"}}>No Pendulum Scale</li>
            )
        }

        if (pendulum){
            return (
                <li><img className="img-fluid" alt={"Pendulum Scale"} src={"https://vignette.wikia.nocookie.net/yugioh/images/4/48/Pendulum_Scales.png/revision/latest?cb=20140603103842"}/> {pendulumScale}</li>
            )
        } else {
            return (
                <></>
            )
        }
    }

    displayCardPendulumDesc = () => {
        const {pendulumDescription} = this.props.cardItem;
        const {pendulum} = this.state;

        if (pendulum && !pendulumDescription) {
            return (
                <li style={{flex: "1"}}>No Pendulum Description</li>
            )
        }

        if (pendulum){
            return (
                <li dangerouslySetInnerHTML={{__html: pendulumDescription}}></li>
            )
        } else {
            return (
                <></>
            )
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
                    <AssignMonsterCardToDeck cardItem={this.props.cardItem}/>
                    <EditCard key={"all"} cardItem={cardItem}/>
                    <DeleteCard cardItem={cardItem}/>
                    <AssignMonsterToCategory cardItem={cardItem} />
                </div>
            )
        } 
        else if (!isAll && userID && deckID && owned) {
            return (
                <div className="item-utils-box">
                    <RemoveCardFromDeck cardItem={this.props.cardItem} deckID={deckID}/>
                    <EditCard key={"all-owned"} cardItem={cardItem}/>
                    <AssignMonsterToCategory cardItem={cardItem} />
                </div>
            )
        }
        else if (!isAll && userID && deckID) {
            return (
                <div className="item-utils-box">
                    <RemoveCardFromDeck cardItem={this.props.cardItem} deckID={deckID}/>
                    <EditCard key={"all-in-deck"} cardItem={cardItem}/>
                    <AssignMonsterToCategory cardItem={cardItem} />
                </div>
            )
        }
        else {
            return (<></>)
        }
    }

    render() {
        const {name, description, atk, def, imageURL} = this.props.cardItem;
        const {displayCardCategories, displayIndividualUtilsBox, displayCardType, displayCardAttribute, displayCardLevels, displayCardPendulumScale, displayCardPendulumDesc} = this;

        return (
            <div className="card-item group-list-item">
                {displayIndividualUtilsBox()}
                <img className="img-fluid" alt={name} src={imageURL}/>
                <div className="card-desc">
                    <a href={imageURL} target="_blank" alt={`${name}'s image`}>
                        <h4>{name}</h4>
                    </a>
                    <ul>
                        <li>{displayCardType()}</li>
                        <li>{displayCardCategories()}</li>
                        {displayCardAttribute()}
                        {displayCardLevels()}
                        <li>ATK {atk}</li>
                        <li>DEF {def}</li>
                    </ul>
                    <ul className="pendulum-box">
                        {displayCardPendulumScale()}
                        {displayCardPendulumDesc()}
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
