import React, { Component } from 'react';
import BlogList from "../components/Blog/BlogList";
import {
    getAllBlogs
} from "../actions/blogActions";
import {connect} from "react-redux";

class AllBlogs extends Component {

    componentDidMount() {
        this.props.getAllBlogs();
    }

    render() {
        return (
            <div>
                <BlogList isAll={true} blogs={this.props.blogs}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBlogs: () => {
            dispatch(getAllBlogs())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogReducer.blogs
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBlogs);
