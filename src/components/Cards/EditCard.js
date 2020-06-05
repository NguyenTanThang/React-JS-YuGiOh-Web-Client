import React, { Component } from 'react';
import {
    editCard
} from "../../actions/cardActions";
import {
    getAllAttributes
} from "../../fetchers/attributeFetchers";
import {
    getAllTypes
} from "../../fetchers/typeFetchers";
import {connect} from "react-redux";
import {Container, Form, Input, Label, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {Link} from "react-router-dom";

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
        attributeList: []
    }

    async componentDidMount() {
        const attributeList = await getAllAttributes();
        const typeList = await getAllTypes();
        const {name, typeID, attributeID, description, levels, atk, def, imageURL} = this.props.cardItem;
        this.setState({
            name, type: typeID, attribute: attributeID, description, levels, atk, def, imageURL,
            attributeList,
            typeList
        })
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

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const {name, type, attribute, description, levels, atk, def, imageURL} = this.state;
        this.props.editCard(this.props.cardItem._id, {name, type, attribute, description, levels, atk, def, imageURL})
        this.setState({
            modal: false,
            name: "", 
            type: "", 
            attribute: "", 
            description: "", 
            levels: 0, 
            atk: 0, 
            def: 0, 
            imageURL: "",
        })
    }

    render() {
        const {onChange, displayTypeOptions, displayAttributeOptions, onSubmit, toggle} = this;
        const {name, type, attribute, description, levels, atk, def, imageURL, modal} = this.state;

        return (
            <div>
                <Button color="warning" onClick={toggle}>
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
                                    <textarea id="description" name="description" required placeholder="Description" value={description} onChange={onChange} className="form-control" rows="5"></textarea>
                                </FormGroup>
            
                                <FormGroup>
                                    <Button color="warning" block type="submit">Update</Button>
                                    <Link to="/" className="btn btn-block btn-info">Back</Link>
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
        cards: state.cardReducer.cards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);
