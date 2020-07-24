import React, { Component } from 'react';
import {Container} from "reactstrap";
import {Link} from "react-router-dom";
import BlogItem from "./BlogItem";
import Header from "../Partials/Header";
import Pagination from "../Partials/Pagination";
import paginate from "../../utils/pagination";
 
class BlogList extends Component {

    state = {
        currentPage: 1
    }

    changeCurrentPage = (pageNum) => {
        this.setState({
            currentPage: pageNum
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    displayUtilsBox = (e) => {
        const {isAll} = this.props;
        const userID = localStorage.getItem("userID");
        if (isAll && userID) {
            return (
                <div className="utils">
                    <Link to={`/blogs/user/${userID}`} className="btn btn-info">View Your Blogs</Link>
                </div>
            )
        } 
        else if (isAll && !userID) {
            return (
                <div className="utils">
                    <Link to={`/users/login`} className="btn btn-info">Login</Link>
                </div>
            )
        }
        else {
            return (
                <div className="utils">
                    <Link to="/blogs/add" className="btn btn-dark">Create Blog</Link>
                    <Link to="/blogs/all" className="btn btn-info">View All Blogs</Link>
                </div>
            )
        }
    }

    onSearch = (searchObject) => {
        this.setState({
            searchObject
        })
    }

    render() {
        const {blogs} = this.props;
        const {currentPage} = this.state;
        const {displayUtilsBox} = this;
        let currentBlogs = blogs;

        let pageObject = paginate(currentBlogs.length, currentPage, 6, 3)
        if (pageObject.totalPages <= 6){
            pageObject = paginate(currentBlogs.length, currentPage, 6, 6)
        }

        currentBlogs = currentBlogs.slice(pageObject.startIndex, pageObject.endIndex + 1);

        currentBlogs = currentBlogs.map(blogItem => {
            return <BlogItem blogItem={blogItem} key={blogItem._id}/>
        })

        if (currentBlogs.length === 0){
            return (
                <div>
                    <Header imageURL={"https://www.wallpaperup.com/uploads/wallpapers/2019/08/10/1332697/7c5f9d209838d1ea4f48fa0be17043d9-700.jpg"} headerText={"BLOG LIST"}/>

                    <Container className="section-padding">
                        {displayUtilsBox()}

                        <h4 className="text-center">Currently there is no blog</h4>
                    </Container>
                </div>
            )
        } else {
            return (
                <div>
                    <Header imageURL={"https://wallpapercave.com/wp/WrJR9yU.jpg"} headerText={"BLOG LIST"}/>
    
                    <Container className="section-padding">
                        {displayUtilsBox()}
    
                        <div className="row">
                            {currentBlogs}
                        </div>
    
                        <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
                    </Container>
                </div>
            )
        }
    }
}

export default (BlogList);
