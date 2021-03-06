import * as actionTypes from "./actionTypes";
import axios from "../../shared/axiosinstance";

export const start = (type) => {
    return { type: type }
};

export const success = (type, data) => {
    return { type: type, payload: data }
};

export const fail = (type, err) => {
    return { type: type, payload: err }
};

export const getPosts = () => async dispatch => {
    dispatch (start(actionTypes.GET_POSTS_START));
    const res = await axios.get(`posts/posts`)
    try {
        if (res.status === 404) {
            dispatch(fail(actionTypes.GET_POSTS_FAIL, res.data.message));
        } else {
            dispatch(success(actionTypes.GET_POSTS_SUCCESS, res.data));
        }
    }
    catch (err) {
        dispatch (fail(actionTypes.GET_POSTS_FAIL, err));
    }
};

export const newPost = (post) => async dispatch => {
    dispatch(start(actionTypes.NEW_POSTS_START));
    try {
        const res = await axios.post(`posts/new-post`, {...post});
        if (res.status === 201) {
            dispatch(success(actionTypes.NEW_POSTS_SUCCESS, res.data.message))
        } else {
            dispatch(fail(actionTypes.NEW_POSTS_FAIL, res.data.message))
        }
    } catch (err) {
        dispatch(fail(actionTypes.NEW_POSTS_FAIL, err))
    }
};

export const updatePosts = (updates) => async dispatch => {
    const id = updates.id;
    dispatch(start(actionTypes.UPDATE_POSTS_START));
    const res = await axios.put(`/posts/update/${id}`, {...updates})
    try {
        if (res.status === 404) {
            dispatch(fail(actionTypes.UPDATE_POSTS_FAIL, res.data.message));
        } else if (res.status === 201) {
            const message = res.data.message
            dispatch(success(actionTypes.UPDATE_POSTS_SUCCESS, {updates: res.data.updates, id, message}));
        }
    } catch (err) {
        dispatch(fail(actionTypes.UPDATE_POSTS_FAIL, err));
    }
};

export const addComment = (comment) => async dispatch => {
    dispatch(start(actionTypes.ADD_COMMENT_START));
    try {
        const res = await axios.post(`comment/addcomment`, {...comment});
        if (res.status === 201) {
            console.log("new post succes message", res.data.message)
            dispatch(success(actionTypes.ADD_COMMENT_SUCCESS, res.data.message))
        } else {
            dispatch(fail(actionTypes.ADD_COMMENT_FAIL, res.data.message))
        }
    } catch (err) {
        dispatch(fail(actionTypes.ADD_COMMENT_FAIL, err))
    }
};

export const getPostsById = (id) => async dispatch => {
    dispatch (start(actionTypes.GET_POST_BY_ID_START));
    const res = await axios.get(`posts/posts/${id}`)
    try {
        if (res.status === 404) {
            dispatch(fail(actionTypes.GET_POST_BY_ID_FAIL, res.data.message));
        } else {
            dispatch(success(actionTypes.GET_POST_BY_ID_SUCCESS, {posts: res.data.posts, comments: res.data.comment}));
        }
    }
    catch (err) {
        dispatch (fail(actionTypes.GET_POST_BY_ID_FAIL, err));
    }
};