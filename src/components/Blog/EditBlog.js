/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from "react-redux";
import {
    editBlog
} from "../../actions/blogActions";
import TinyTextEditor from "../Partials/TinyTextEditor";

class EditBlog extends Component {
  
    state = {
        modal: false,
        title: "",
        thumbImageURL: "",
        content: ""
    }

    componentDidMount() {
        const {title, content, thumbImageURL} = this.props.blogItem;

        this.setState({
            title, content, thumbImageURL
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
        const {_id} = this.props.blogItem;
        const {title, content, thumbImageURL} = this.state;
        this.props.editBlog(_id, {title, content, thumbImageURL});
        this.setState({
            modal: false
        })
    }

    onContentChange = (content) => {
        this.setState({
            content
        })
    }

render(){
    const {
        className
      } = this.props;
      const {toggle, onChange, onSubmit, onContentChange} = this;
      const {modal, title, content, thumbImageURL} = this.state;

      return (
        <div>
          <Button color="warning" onClick={toggle}>Edit</Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Edit Blog</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>

                <FormGroup>
                    <Label htmlFor="title">Title:</Label>
                    <Input id="title" name="title" required placeholder="Title" value={title} onChange={onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="thumbImageURL">Thumbnail Image URL:</Label>
                    <Input id="thumbImageURL" name="thumbImageURL" required placeholder="Thumbnail Image URL" value={thumbImageURL} onChange={onChange}/>
                </FormGroup>

                <FormGroup>
                        <Label htmlFor="content">Description:</Label>
                        <TinyTextEditor onContentChange={onContentChange} content={content}/>
                    </FormGroup>
    
                <FormGroup>
                    <Button type="submit" color="warning" block>Update</Button>
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

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editBlog: (blogID, {title, content, thumbImageURL}) => {
            dispatch(editBlog(blogID, {title, content, thumbImageURL}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
