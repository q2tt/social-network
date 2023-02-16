
import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType2 = {
    userID: number | null
    email: string | null
    password: string | null
    isAuth: boolean
    captchaUrl:  string | null
}

let initialState  = {
    userID: null as number | null,
    email: null as string | null,
    password: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

export const authReducer = (state = initialState, action: any) :InitialStateType => {
    switch (action.type) {
        case GET_CAPTCHA_URL_SUCCESS:
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

type SetAuthUserDataPayloadtype = {
    userId: number | null
    email: string | null
    password: string | null
    isAuth: boolean
}
type SetAuthUserDatatype = {
   type: typeof SET_USER_DATA , 
    payload: SetAuthUserDataPayloadtype 
}

export const setAuthUserData = (userId: number | null, email: string | null, password: string | null, isAuth: boolean): SetAuthUserDatatype => ({type: SET_USER_DATA , payload:
        {userId, email, password, isAuth}});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS 
     payload: { captchaUrl: string}
}
export const getCaptchaUrlSuccess = (captchaUrl: string):GetCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS , payload: {captchaUrl} });


export const getAuthUser = () => async (dispatch: any) => {
    const response = await authAPI.me()
                if(response.data.resultCode === 0){
                    let {id, password, email} = response.data.data;
                    dispatch(setAuthUserData(id,  email, password,  true))

                }
}

export const login = (email: string, password: string, rememberMe: boolean, setStatus: any, setSubmitting:any) => async (dispatch: any) => {
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

export const getCaptchaUrl = () => async (dispatch:any) => {
    const response = await  securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
debugger
    dispatch(getCaptchaUrlSuccess(captchaUrl))
};



export  const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
            if(response.data.resultCode === 0){
                dispatch(setAuthUserData(null, null, null, false))

            }
}

export  default authReducer;