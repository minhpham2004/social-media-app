import { GLOBALTYPES } from "./globalTypes";
import { POST_TYPES } from "./postAction";
import { postDataAPI } from "../../utils/fetchData";

export const createComment = (post, newComment, auth) => async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] }
    console.log({ post, newPost })

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
        const data = { ...newComment, postId: post._id }
        const res = await postDataAPI('comment', data, auth.token)
        console.log(res)
    } catch (err) {
        console.log(err)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}   