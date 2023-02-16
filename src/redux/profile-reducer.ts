
import {profileAPI, usersAPI} from "../api/api";
import { PostType, ProfileType, PhotosType } from "../types/types";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS ';
const DELETE_POST ='DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';




let initialState = {
    posts : [
        {id: 1, message: 'hi', like: 12},
        {id: 2, message: 'My baby', like: 19},
        {id: 3, message: 'Alona', like: 12}
    ] as Array<PostType>,
    newPostText: 'la-la-la',
    profile: null as ProfileType | null,
    status: '',
}

export type InitialStateType = typeof initialState;

export const profileReducer = (state = initialState, action: any):InitialStateType  => {


    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                like: 0
            }
            let stateCopy = {...state}
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy
        }

        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state}
            stateCopy.newPostText = action.newText;
            return stateCopy
        }

        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }

        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }

        case DELETE_POST: {
            return {
                ...state, posts: state.posts.filter(p=> p.id != action.id)
            }
        }

        case SAVE_PHOTO_SUCCESS: {

            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }


        default:
            return state
    }

}

type AddPostActionCreatorType = { type: typeof ADD_POST}
export const addPostActionCreator = (): AddPostActionCreatorType => ({type: ADD_POST});


type DeletePostType = { 
    type: typeof  DELETE_POST
    id: number
}
export const deletePost = (id: number): DeletePostType  => ({type: DELETE_POST, id});


type UpdateNewPostTextActionCreatorType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
export const updateNewPostTextActionCreator = (text:string):UpdateNewPostTextActionCreatorType  =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text})

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE    
    profile: ProfileType
}
export const setUserProfile = (profile:ProfileType):SetUserProfileType  =>
    ({type: SET_USER_PROFILE, profile })

type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status:string):SetStatusType =>
    ({type: SET_STATUS, status })

type  SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType  =>
    ({type: SAVE_PHOTO_SUCCESS, photos})



export const getUserProfile = (userId:number) => async (dispatch:any) => {
    let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
}

export const getStatus = (userId:number) =>  async (dispatch:any) =>{
    let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
}

export const updateStatus = (status:string)  => async (dispatch:any)  => {
    let response = await profileAPI.updateStatus(status)
               if(response.data.resultCode === 0){
                   dispatch(setStatus(status))
               }
}

export const savePhoto = (file:any)  => async (dispatch:any)  => {
    let response = await profileAPI.savePhoto(file)
    if(response.data.resultCode === 0){
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}


export  default profileReducer;