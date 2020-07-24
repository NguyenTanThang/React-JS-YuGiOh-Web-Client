import {
    GET_BLOGS_BY_USER_ID,
    GET_BLOG_BY_ID,
    GET_ALL_BLOGS,
    ADD_BLOG,
    EDIT_BLOG,
    DELETE_BLOG,
} from "../actions/types";

const initialState = {
    blogs: [],
    userBlogs: [],
    blog: {}
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BLOGS:
            return {
                ...state,
                blogs: action.payload.blogs
            }
            break;
        case GET_BLOGS_BY_USER_ID:
            return {
                ...state,
                userBlogs: action.payload.userBlogs
            }
            break;
        case GET_BLOG_BY_ID:
            return {
                ...state,
                blog: action.payload.blog
            }
            break;
        case ADD_BLOG:
            return {
                ...state,
                userBlogs: [...state.userBlogs, action.payload.blog]
            }
            break;
        case EDIT_BLOG:
            return {
                ...state,
                userBlogs: state.userBlogs.map(blogItem => {
                    if (blogItem._id == action.payload.blog._id) {
                        return action.payload.blog;
                    }
                    return blogItem;
                }),
                blog: action.payload.blog,
            }
            break;
        case DELETE_BLOG:
            return {
                ...state,
                userBlogs: state.userBlogs.filter(blogItem => {
                    return action.payload.blog._id != blogItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default blogReducer;