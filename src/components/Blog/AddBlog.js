/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from "react-redux";
import {
    addBlog
} from "../../actions/blogActions";
import CKEditor from '@ckeditor/ckeditor5-react';
import Header from "../Partials/Header";
import ClassicEditor from "ckeditor5-custom-build-reach";
import {Link} from "react-router-dom"

class AddBlog extends Component {
  
    state = {
        title: "",
        thumbImageURL: "",
        content: ""
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {title, content, thumbImageURL} = this.state;
        this.props.addBlog(title, thumbImageURL, content);
        this.setState({
            title: "",
            thumbImageURL: "",
            content: ""
        })
    }

render(){
    const {
        className
      } = this.props;
      const {onChange, onSubmit} = this;
      const {title, content, thumbImageURL} = this.state;

      return (
          <div>

        <Header imageURL={"https://www.wallpaperup.com/uploads/wallpapers/2019/08/10/1332697/7c5f9d209838d1ea4f48fa0be17043d9-700.jpg"} headerText={"CREATE BLOG"}/>

        <div className="container section-padding">
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
                        <Label htmlFor="content">Content:</Label>
                        <CKEditor
                            style={{height: "500px"}}
                            id="content" name="content" required
                            placeholder="Content"
                            editor={ 
                                ClassicEditor
                             }
                            data={content}
                            onInit={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log(editor);
                            } }
                            onChange={ ( event, editor ) => {
                                const textdata = editor.getData();
                                this.setState({
                                    content: textdata
                                })
                            } }
                        />
                    </FormGroup>
    
                <FormGroup>
                    <Button type="submit" color="dark" block>Create</Button>
                    <Link to="/blogs/all" className="btn btn-block btn-info">Back</Link>
                </FormGroup>
              
              </Form>
        </div>
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
        addBlog: (title, thumbImageURL, content) => {
            dispatch(addBlog(title, thumbImageURL, content))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);
