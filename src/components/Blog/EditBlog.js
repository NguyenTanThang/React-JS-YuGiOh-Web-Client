/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from "react-redux";
import {
    editBlog
} from "../../actions/blogActions";
import {
    getBlogByID
} from "../../fetchers/blogFetchers";
import TinyTextEditor from "../Partials/TinyTextEditor";
import Header from "../Partials/Header";
import Loading from "../Partials/Loading";
import {Link} from "react-router-dom"

class EditBlog extends Component {
  
    state = {
        title: "",
        thumbImageURL: "",
        content: "",
        loading: true
    }

    async componentDidMount() {
        const blogID = this.props.match.params.blogID;
        const blogItem = await getBlogByID(blogID);
        const {title, content, thumbImageURL} = blogItem.blog;

        this.setState({
            title, content, thumbImageURL, loading: false
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const blogID = this.props.match.params.blogID;
        const {title, content, thumbImageURL} = this.state;
        this.props.editBlog(blogID, {title, content, thumbImageURL});
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
      const {onChange, onSubmit, onContentChange} = this;
      const {title, content, thumbImageURL, loading} = this.state;

      if (loading) {
          return <Loading/>
      }

      return (
          <div>
        <Header imageURL={thumbImageURL} headerText={"EDIT BLOG"}/>

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
                    <TinyTextEditor onContentChange={onContentChange} content={content}/>
                </FormGroup>

            <FormGroup>
                <Button type="submit" color="warning" block>Update</Button>
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
        editBlog: (blogID, {title, content, thumbImageURL}) => {
            dispatch(editBlog(blogID, {title, content, thumbImageURL}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
