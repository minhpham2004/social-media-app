import { GLOBALTYPES } from "./globalTypes"
import { getDataAPI, postDataAPI, deleteDataAPI } from '../../utils/fetchData'

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES'
}

export const createNotify = ({ msg, auth, socket }) => async (dispatch) => {
    try {
        await postDataAPI('notify', msg, auth.token) 
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const removeNotify = ({ msg, auth, socket }) => async (dispatch) => {
    try {
        await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getNotifies = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('notifies', token) 

        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}