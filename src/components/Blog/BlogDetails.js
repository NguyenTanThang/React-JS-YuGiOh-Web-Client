import React, { Component } from 'react';
import Header from "../Partials/Header";
import Loading from "../Partials/Loading";
import {getBlogByID} from "../../fetchers/blogFetchers";
import {dateParserWithMonth_ISODate} from "../../utils/dateParser";
import {Link} from "react-router-dom"

class BlogDetails extends Component {

    state = {
        blog: {},
        loading: true
    }

    async componentDidMount(){
        const blogID = this.props.match.params.blogID;
        const blog = await getBlogByID(blogID);
        console.log(blog.blog)
        this.setState({
            blog,
            loading: false
        })
    }

    render() {
        const {loading} = this.state;

        if (loading) {
            return <Loading/>
        }

        const {user} = this.state.blog;
        const {thumbImageURL, title, content, created_date} = this.state.blog.blog

        return (
            <div>
                <Header imageURL={thumbImageURL} headerText={title} authorName={user}/>

                <div className="container section-padding">
                    <div className="row align-items-start">
                        <div className="blog-content-html col-lg-8 col-md-8 col-sm-12" >
                            <div dangerouslySetInnerHTML={{__html: content}} />
                        </div>
                        

                        <div className="blog-author col-lg-4 col-md-4 col-sm-12">
                            <h4>Author</h4>
                            <img src={user.avatarURL} className="img-fluid" />
                            <h5>{user.username}</h5>
                            <h6>Created On: {dateParserWithMonth_ISODate(created_date)}</h6>
                            <Link to="/blogs/all" className="btn btn-info">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default BlogDetails;
