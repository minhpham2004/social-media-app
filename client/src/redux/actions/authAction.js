import { postDataAPI } from "../../utils/fetchData"

export const TYPES = {
    AUTH: "AUTH"
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        const res = await postDataAPI('login', data)

        dispatch({
            type: "AUTH",
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })

        localStorage.setItem("firstLogin", true)
        dispatch({
            type: "NOTIFY",
            payload: {
                success: res.data.msg
            }
        })
    } catch (err) {
        dispatch({
            type: "NOTIFY",
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
        dispatch({ type: "NOTIFY", payload: { loading: true } })

        try {
            const res = await postDataAPI('refresh_token')
        } catch (err) {
            dispatch({
                type: "NOTIFY",
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}