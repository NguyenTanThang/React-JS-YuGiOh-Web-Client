import React, { Component } from 'react';
import {
    getAllTrapCards
} from "../../actions/trapCardActions";
import {connect} from "react-redux";
import {
    getTrapCategoryByID
} from "../../fetchers/categoryFetchers";

class CardItem extends Component {

    state = {
        category: {}
    }

    async componentDidMount() {
        //this.props.getAllSpellCards();
        const {categoryID} = this.props.cardItem
        const category = await getTrapCategoryByID(categoryID);
        this.setState({
            category
        })
    }

    render() {
        const {name, description, imageURL, categoryID, _id} = this.props.cardItem;
        const {category} = this.state;

        return (
            <div className="card-item group-list-item trap">
                <img className="img-fluid" alt={name} src={imageURL}/>
                <div className="card-desc">
                    <h4>{name}</h4>
                    <ul>
                        <li><img className="img-fluid" alt={category.name} src={"https://vignette.wikia.nocookie.net/yugioh/images/2/28/TRAP.svg/revision/latest/scale-to-width-down/300?cb=20120918121520"}/> Trap</li>
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
        getAllTrapCards: () => {
            dispatch(getAllTrapCards())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.trapCardReducer.cards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
