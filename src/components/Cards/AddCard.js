import React, { Component } from 'react';
import {
    addCard
} from "../../actions/cardActions";
import {
    getAllAttributes
} from "../../fetchers/attributeFetchers";
import {
    getAllCategories
} from "../../fetchers/categoryFetchers";
import {
    getAllTypes
} from "../../fetchers/typeFetchers";
import {connect} from "react-redux";
import Header from "../Partials/Header";
import {Container, Form, Input, Label, Button, FormGroup} from "reactstrap";
import {Link} from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from "ckeditor5-custom-build-reach";

class AddCard extends Component {

    state = {
        name: "", 
        type: "", 
        attribute: "", 
        description: "", 
        categoryID: "", 
        levels: 0, 
        atk: 0, 
        def: 0, 
        imageURL: "",
        typeList: [],
        attributeList: [],
        categoryList: []
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    displayTypeOptions = () => {
        const {typeList} = this.state;

        return typeList.map(typeItem => {
            return (
                <option key={typeItem._id} value={typeItem._id}>{typeItem.name}</option>
            )
        })
    }

    displayAttributeOptions = () => {
        const {attributeList} = this.state;

        return attributeList.map(attributeItem => {
            return (
                <option key={attributeItem._id} value={attributeItem._id}>
                    {attributeItem.name}
                </option>
            )
        })
    }

    displayCategoryOptions = () => {
        const {categoryList} = this.state;

        return categoryList.map(categoryItem => {
            return (
                <option key={categoryItem._id} value={categoryItem._id}>
                    {categoryItem.name}
                </option>
            )
        })
    }

    async componentDidMount() {
        const attributeList = await getAllAttributes();
        const typeList = await getAllTypes();
        const categoryList = await getAllCategories();
        this.setState({
            attributeList,
            typeList,
            categoryList
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const {name, type, attribute, description, levels, atk, def, imageURL, categoryID} = this.state;
        this.props.addCard({name, type, attribute, description, levels, atk, def, imageURL, categoryID})
        this.setState({
            name: "", 
            type: "", 
            attribute: "", 
            description: "", 
            levels: 0, 
            atk: 0, 
            def: 0, 
            imageURL: "",
            categoryID: ""
        })
    }

    render() {
        const {onChange, displayTypeOptions, displayAttributeOptions, onSubmit, displayCategoryOptions} = this;
        const {name, type, attribute, description, levels, atk, def, imageURL, categoryID} = this.state;

        return (
            <div className="form-container">
                <Form onSubmit={onSubmit}>
                
                    <FormGroup>
                        <Label htmlFor="name">Name:</Label>
                        <Input id="name" name="name" required placeholder="Name" value={name} onChange={onChange}/>
                    </FormGroup>

                    <FormGroup className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <Label htmlFor="type">Type:</Label>
                            <select defaultValue={type} id="type" name="type" required value={type} onChange={onChange} className="custom-select">
                                <option value={""} disabled>--Type--</option>
                                {displayTypeOptions()}
                            </select>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <Label htmlFor="attribute">Attribute:</Label>
                            <select defaultValue={attribute} id="attribute" name="attribute" required value={attribute} onChange={onChange} className="custom-select">
                                <option value={""} disabled>--Attribute--</option>
                                {displayAttributeOptions()}
                            </select>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="category">Category:</Label>
                        <select defaultValue={categoryID} id="categoryID" name="categoryID" required value={categoryID} onChange={onChange} className="custom-select">
                            <option value={""} disabled>--Category--</option>
                                {displayCategoryOptions()}
                        </select>
                    </FormGroup>

                    <FormGroup className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <Label htmlFor="atk">ATK:</Label>
                            <Input type="number" id="atk" name="atk" required placeholder="ATK" value={atk} onChange={onChange}/>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <Label htmlFor="def">DEF:</Label>
                            <Input type="number" id="def" name="def" required placeholder="DEF" value={def} onChange={onChange}/>
                        </div>
                    </FormGroup>

                    <FormGroup className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <Label htmlFor="levels">Levels:</Label>
                            <Input id="levels" name="levels" required placeholder="Levels" value={levels} type="number" onChange={onChange}/>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <Label htmlFor="imageURL">Image URL:</Label>
                            <Input id="imageURL" name="imageURL" required placeholder="Image URL" value={imageURL} onChange={onChange}/>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="description">Description:</Label>
                        <CKEditor
                            id="description" name="description" required
                            placeholder="Description"
                            editor={ ClassicEditor }
                            data={description}
                            onInit={ editor => {
                                // You can store the "editor" and use when it is needed.
                            } }
                            onChange={ ( event, editor ) => {
                                const textdata = editor.getData();
                                this.setState({
                                    description: textdata
                                })
                            } }
                        />
                    </FormGroup>

                    <FormGroup>
                        <Button color="dark" className="pulse" block type="submit">Create</Button>
                        <Link to="/" className="btn btn-block btn-info pulse">Back</Link>
                    </FormGroup>

                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (newCard) => {
            dispatch(addCard(newCard))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cardReducer.cards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
