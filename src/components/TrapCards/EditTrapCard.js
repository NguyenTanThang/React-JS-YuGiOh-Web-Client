/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from "react-redux";
import {
    getAllTrapCards,
    editTrapCard
} from "../../actions/trapCardActions";
import {
    getTrapCategories
} from "../../fetchers/categoryFetchers";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class EditTrapCard extends Component {
  
    state = {
        modal: false,
        name: "",
        description: "",
        imageURL: "",
        categoryID: "",
        categoryList: []
    }

    async componentDidMount(){
        this.props.getAllTrapCards();
        const {cardItem} = this.props;
        const {name, description, imageURL, categoryID} = cardItem
        const categoryList = await getTrapCategories();
        this.setState({
            name, description, imageURL, categoryID,
            categoryList
        })
    }

  toggle = () => {
      this.setState({
        modal: !this.state.modal
      })
  }

  onChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
}

    onSubmit = (e) => {
        e.preventDefault();
        const {name, description, categoryID, imageURL} = this.state;
        this.props.editTrapCard(this.props.cardItem._id, {name, description, categoryID, imageURL});
        this.setState({
            modal: false
        })
    }

  displayCategoryOptions = () => {
    let categoryList = this.state.categoryList;

    return categoryList.map(categoryItem => {
        return (
            <option key={categoryItem._id} value={categoryItem._id}>
                {categoryItem.name}
            </option>
        )
    })
  }

render(){
    const {
        className
      } = this.props;
      const {toggle, displayCategoryOptions, onChange, onSubmit} = this;
      const {modal, name, categoryID, imageURL, description} = this.state;

      return (
        <div>
          <Button color="warning" onClick={toggle} className="up">
            <i className="fas fa-edit"></i>
          </Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Edit Trap Card</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>

                <FormGroup>
                    <Label htmlFor="name">Name:</Label>
                    <Input id="name" name="name" required placeholder="Name" value={name} onChange={onChange}/>
                </FormGroup>
    
                <FormGroup>
                    <Label htmlFor="categoryID">Category:</Label>
                    <select defaultValue={categoryID} id="categoryID" name="categoryID" required value={categoryID} onChange={onChange} className="custom-select">
                        <option value={""} disabled>--Category--</option>
                        {displayCategoryOptions()}
                    </select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="imageURL">Image URL:</Label>
                    <Input id="imageURL" name="imageURL" required placeholder="Image URL" value={imageURL} onChange={onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="name">Name:</Label>
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
                    <Button type="submit" color="dark" block>Update</Button>
                </FormGroup>
              
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
}
  
}

const mapStateToProps = (state) => {
    return {
        cards: state.trapCardReducer.cards
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTrapCards: () => {
            dispatch(getAllTrapCards())
        },
        editTrapCard: (cardID, updatedCard) => {
            dispatch(editTrapCard(cardID, updatedCard))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTrapCard);
