import React, { Component } from 'react';
import {
    editCard
} from "../../actions/cardActions";
import {
    getAllAttributes
} from "../../fetchers/attributeFetchers";
import {
    getCategoryByID
} from "../../fetchers/categoryFetchers";
import {
    getAllTypes
} from "../../fetchers/typeFetchers";
import {connect} from "react-redux";
import {Container, Form, Input, Label, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {Link} from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class EditCard extends Component {

    state = {
        modal: false,
        name: "", 
        type: "", 
        attribute: "", 
        description: "", 
        levels: 0, 
        atk: 0, 
        def: 0, 
        imageURL: "",
        typeList: [],
        attributeList: [],
        categoryIDs: [],
        categoryList: [],
        loading: true
    }

    async componentDidMount() {
        const attributeList = await getAllAttributes();
        const typeList = await getAllTypes();
        let categoryList = [];
        const {name, typeID, attributeID, description, levels, atk, def, imageURL, categoryIDs} = this.props.cardItem;
        for (let index = 0; index < categoryIDs.length; index++) {
            const categoryID = categoryIDs[index];
            const category = await getCategoryByID(categoryID);
            categoryList.push(category)
        }
        this.setState({
            name, type: typeID, attribute: attributeID, description, levels, atk, def, imageURL, categoryIDs,
            attributeList,
            typeList,
            categoryList,
            loading: false
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onRemoveCategorySelect = (categoryID) => {
        let categoryIDs = this.state.categoryIDs;
        let categoryList = this.state.categoryList;
        categoryIDs = categoryIDs.filter(categoryIDItem => {
            return categoryIDItem !== categoryID;
        })
        categoryList = categoryList.filter(categoryItem => {
            return categoryItem._id !== categoryID;
        })
        this.setState({
            categoryIDs,
            categoryList
        })
    }

    displayCategoryInputs = () => {
        const {categoryList, loading} = this.state;
        const {onRemoveCategorySelect} = this;

        if (loading) {
            return <p>Loading...</p>
        }

        if (categoryList.length === 0) {
            return <p>This card does not belong to any category</p>
        }
        
        return categoryList.map((categoryItem, index) => {
            const categoryID = categoryItem._id
            return (
                <div className="category-input mb-2">
                    <input type="text" value={categoryItem.name} className="form-control" id={`${categoryID}-${index}`} name={`${categoryID}-${index}`} key={`${categoryID}-${index}`}/>

                    <button className="btn btn-danger btn-block" onClick={() => onRemoveCategorySelect(categoryID)} type="button">Remove</button>
                </div>
                
            )
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

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {name, type, attribute, description, levels, atk, def, imageURL, categoryIDs} = this.state;
        this.props.editCard(this.props.cardItem._id, {name, type, attribute, description, levels, atk, def, imageURL, categoryIDs})
        this.setState({
            modal: false,
        })
    }

    render() {
        const {onChange, displayTypeOptions, displayAttributeOptions, onSubmit, toggle, displayCategoryInputs} = this;
        const {name, type, attribute, description, levels, atk, def, imageURL, modal} = this.state;

        return (
            <div>
                <Button color="warning" onClick={toggle}  className="up">
                    <i className="fas fa-edit"></i>
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Edit Card</ModalHeader>
                    <ModalBody>
                        <div className="form-container">
                            <Form onSubmit={onSubmit}>
                            
                                <FormGroup>
                                    <Label htmlFor="name">Name:</Label>
                                    <Input id="name" name="name" required placeholder="Name" value={name} onChange={onChange}/>
                                </FormGroup>
            
                                <FormGroup>
                                    <Label htmlFor="type">Type:</Label>
                                    <select defaultValue={type} id="type" name="type" required value={type} onChange={onChange} className="custom-select">
                                        <option value={""} disabled>--Type--</option>
                                            {displayTypeOptions()}
                                    </select>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="categoryIDs">Category:</Label>
                                    {displayCategoryInputs()}
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="attribute">Attribute:</Label>
                                    <select defaultValue={attribute} id="attribute" name="attribute" required value={attribute} onChange={onChange} className="custom-select">
                                        <option value={""} disabled>--Attribute--</option>
                                        {displayAttributeOptions()}
                                    </select>
                                </FormGroup>
            
                                <FormGroup>
                                    <Label htmlFor="atk">ATK:</Label>
                                    <Input type="number" id="atk" name="atk" required placeholder="ATK" value={atk} onChange={onChange}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="def">DEF:</Label>
                                    <Input type="number" id="def" name="def" required placeholder="DEF" value={def} onChange={onChange}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="levels">Levels:</Label>
                                    <Input id="levels" name="levels" required placeholder="Levels" value={levels} type="number" onChange={onChange}/>
                                </FormGroup>
            
                                <FormGroup>
                                    <Label htmlFor="imageURL">Image URL:</Label>
                                    <Input id="imageURL" name="imageURL" required placeholder="Image URL" value={imageURL} onChange={onChange}/>
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
                                    <Button color="warning" block type="submit">Update</Button>
                                </FormGroup>
            
                            </Form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editCard: (cardID, updatedCard) => {
            dispatch(editCard(cardID, updatedCard))
        }
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);
