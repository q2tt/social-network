import {authAPI, securityAPI, usersAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userID: null,
    email: null,
    password: null,
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAPTCHA_URL_SUCCESS:
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId, email, password, isAuth) => ({type: SET_USER_DATA , payload:
        {userId, email, password, isAuth}});

export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS , payload: {captchaUrl} });


export const getAuthUser = () => async (dispatch) => {
    const response = await authAPI.me()
                if(response.data.resultCode === 0){
                    let {id, password, email} = response.data.data;
                    dispatch(setAuthUserData(id,  email, password,  true))

                }
}

export const login = (email, password, rememberMe, setStatus, setSubmitting) => async (dispatch) => {
    const response = await  authAPI.login(email, password, rememberMe)

            if (response.data.resultCode === 0) {
                dispatch(getAuthUser())
            } else {
                if(response.data.resultCode === 10){
                    dispatch(getCaptchaUrl)
                }
                setStatus({message: response.data.messages})
            };
            setSubmitting(false);
};

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await  securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
debugger
    dispatch(getCaptchaUrlSuccess(captchaUrl))
};



export  const logout = () => async (dispatch) => {
    const response = await authAPI.logout()
            if(response.data.resultCode === 0){
                dispatch(setAuthUserData(null, null, null, false))

            }
}

export  default authReducer;