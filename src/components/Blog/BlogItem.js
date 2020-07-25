import React, { Component } from 'react';
import {connect} from "react-redux";
import {dateParserWithMonth_ISODate} from "../../utils/dateParser";
import {Link} from "react-router-dom";
import {
    getUserByID
} from "../../fetchers/userFetchers";

class BlogItem extends Component {

    state = {
        user: {},
        loading: true,
        blog_text: ""
    }

    async componentDidMount(){
        const userID = this.props.blogItem.userID;
        const {content} = this.props.blogItem;
        const user = await getUserByID(userID);
        var tmp = document.createElement("DIV");
        tmp.innerHTML = content;
        const blog_text = tmp.textContent || tmp.innerText || "";
        this.setState({
            user,
            loading: false,
            blog_text
        })
    }

    displayEditBlogButton = () => {
        const userID = localStorage.getItem("userID");
        const blogUserID = this.props.blogItem.userID;
        if (userID === blogUserID){
            return (
                <div className="item-utils-box" style={{marginTop: "10px"}}>
                    <Link to={`/blogs/edit/${this.props.blogItem._id}`} className="btn btn-warning">Edit</Link>
                </div>
            )
        } else {
            return <></>
        }
    }

    displayUser = () => {
        const {user, loading} = this.state;
        if (loading) {
            return "Loading..."
        } else {
            return (
                <>
                    <img src={user.avatarURL} className="img-fluid"/>
                    {user.username}
                </>
            )
        }
    }

    render() {
        const {title, content, thumbImageURL, created_date, _id} = this.props.blogItem;
        const {blog_text} = this.state;
        const {displayEditBlogButton, displayUser} = this;

        return (
            <div className="blog-item col-lg-4 col-md-6 col-sm-12">
                <img className="img-fluid" src={thumbImageURL} alt={title}/>
                <div className="blog-desc">
                    <div className="blog-title">
                        <h3><Link to={`/blogs/details/${_id}`}>{title}</Link></h3>
                    </div>
                    <div className="blog-content">
                        <p>{`${blog_text.substring(0, 256)}...`}</p>
                    </div>
                    <div className="blog-footer">
                        <h6>{displayUser()}</h6>
                        <h6>{dateParserWithMonth_ISODate(created_date)}</h6>
                    </div>
                    
                    {displayEditBlogButton()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);
