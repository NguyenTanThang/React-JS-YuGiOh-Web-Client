import React, { Component } from 'react';
import {
    getAllSpellCards
} from "../../actions/spellCardActions";
import {connect} from "react-redux";
import {
    getSpellCategoryByID
} from "../../fetchers/categoryFetchers";
import EditSpellCard from "./EditSpellCard";
import AssignSpellCardToDeck from "./AssignSpellCardToDeck";
import DeleteSpellCard from "./DeleteSpellCard";

class SpellCardItem extends Component {

    state = {
        category: {}
    }

    async componentDidMount() {
        //this.props.getAllSpellCards();
        const {categoryID} = this.props.cardItem
        const category = await getSpellCategoryByID(categoryID);
        this.setState({
            category
        })
    }

    displayIndividualUtilsBox = () => {
        const {isAll, cardItem} = this.props;
        const userID = localStorage.getItem("userID");
        if (isAll && userID){
            return (
                <div className="item-utils-box">
                    <AssignSpellCardToDeck cardItem={cardItem}/>
                    <EditSpellCard cardItem={cardItem}/>
                    <DeleteSpellCard cardItem={cardItem}/>
                </div>
            )
        } else {
            return (<></>)
        }
    }

    render() {
        const {name, description, imageURL, categoryID, _id} = this.props.cardItem;
        const {category} = this.state;
        const {displayIndividualUtilsBox} = this;

        return (
            <div className="card-item group-list-item spell">
                {displayIndividualUtilsBox()}
                <img className="img-fluid" alt={name} src={imageURL}/>
                <div className="card-desc">
                    <h4>{name}</h4>
                    <ul>
                        <li><img className="img-fluid" alt={category.name} src={"https://vignette.wikia.nocookie.net/yugioh/images/0/09/SPELL.svg/revision/latest/scale-to-width-down/300?cb=20120918121429"}/> Spell</li>
                        <li><img className="img-fluid" alt={category.name} src={category.imageURL}/> {category.name}</li>
                    </ul>
                    <p>{description}</p>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpellCards: () => {
            dispatch(getAllSpellCards())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.spellCardReducer.cards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellCardItem);
