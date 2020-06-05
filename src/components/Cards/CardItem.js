import React, { Component } from 'react';
import {
    getAllCards
} from "../../actions/cardActions";
import {connect} from "react-redux";
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

class CardItem extends Component {

    state = {
        type: {},
        attribute: {},
        categoryList: []
    }

    async componentDidMount() {
        this.props.getAllCards();
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
            categoryList
        })
    }

    displayCardCategories = () => {
        const {categoryList} = this.state;
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
        const {isAll, cardItem} = this.props;
        if (isAll){
            return (
                <div className="item-utils-box">
                    <AssignMonsterCardToDeck cardItem={this.props.cardItem}/>
                    <EditCard cardItem={cardItem}/>
                    <DeleteCard cardItem={cardItem}/>
                    <AssignMonsterToCategory cardItem={cardItem} />
                </div>
            )
        } else {
            return (<></>)
        }
    }

    render() {
        const {name, typeID, attributeID, description, levels, atk, def, imageURL, categoryIDs, _id} = this.props.cardItem;
        const {type, attribute} = this.state;
        const {displayCardCategories, displayIndividualUtilsBox} = this;

        return (
            <div className="card-item group-list-item">
                {displayIndividualUtilsBox()}
                <img className="img-fluid" alt={name} src={imageURL}/>
                <div className="card-desc">
                    <h4>{name}</h4>
                    <ul>
                        <li>Type {type.name}</li>
                        <li>{displayCardCategories()}</li>
                        <li><img className="img-fluid" alt={attribute.name} src={attribute.imageURL}/> {attribute.name}</li>
                        <li>Levels {levels}</li>
                        <li>ATK {atk}</li>
                        <li>DEF {def}</li>
                    </ul>
                    <p>{description}</p>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCards: () => {
            dispatch(getAllCards())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cardReducer.cards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
