import React, { Component } from 'react';
import BlogList from "../components/Blog/BlogList";
import {
    getBlogsByUserID
} from "../actions/blogActions";
import {connect} from "react-redux";

class UserBlogPage extends Component {

    componentDidMount() {
        const userID = this.props.match.params.userID;
        this.props.getBlogsByUserID(userID);
    }

    render() {
        return (
            <div>
                <BlogList isAll={false} blogs={this.props.userBlogs}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBlogsByUserID: (userID) => {
            dispatch(getBlogsByUserID(userID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userBlogs: state.blogReducer.userBlogs
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBlogPage);
