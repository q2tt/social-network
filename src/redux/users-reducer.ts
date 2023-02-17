import {usersAPI} from "../api/api";
import { UserType } from "../types/types";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE ';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users : [
          ] as Array<UserType>,
    pageSize: 25,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: false,
    followingInProgress: [ ] as Array<number>
}

type InitialState = typeof initialState;

export const usersReducer = (state = initialState, action:any): InitialState => {


    switch (action.type) {
        case FOLLOW:
            return  { ...state,
                users : updateObjectInArray (state.users, action.userId, 'id', {followed: true})
            }

        case UNFOLLOW:
            return  { ...state,
                users : updateObjectInArray (state.users, action.userId, 'id', {followed: false})

            }

        case SET_USERS: {
            return { ...state, users: action.users }
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }

        case SET_USERS_TOTAL_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS : {
            return { ...state,
                followingInProgress: action.isFetching ?[...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id=>id!=action.userId) }
        }

        default:
            return state
    }

}

type FollowSucessActionType = {
    type: typeof FOLLOW  
    userId: number
}
export const followSucess = (userId:number):FollowSucessActionType  => ({type: FOLLOW , userId});

type UnfollowSucessActionType = {
    type: typeof UNFOLLOW
    userId: number
}

export const unfollowSucess = (userId:number):UnfollowSucessActionType => ({type: UNFOLLOW, userId});

type SetUserActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export const setUsers = (users:Array<UserType>):SetUserActionType  => ({type: SET_USERS, users });

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage:number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});

type SetUsersTotalCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    count: number
}

export const setUsersTotalCount = (totalUsersCount:number):SetUsersTotalCountActionType  => ({type: SET_USERS_TOTAL_COUNT, count: totalUsersCount});

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});

type  FollowingInProgressAActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
     userId:number
}

export const followingInProgressA = (isFetching:boolean, userId:number):FollowingInProgressAActionType  => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});


export const getUsers = (page:number, pageSize:number) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        let response = await usersAPI.getUsers(page, pageSize)
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(response.items));
                dispatch(setUsersTotalCount(response.totalCount))
    }
}
const followUnfollowFlow = async (dispatch:any, userId:number, apiMethod:any, actionCreator:any) => {
    dispatch(toggleIsFetching(true))
    let response = await apiMethod(userId)
    if(response.data.resultCode === 0){
        dispatch( actionCreator(userId))
    }
    dispatch(toggleIsFetching(false))
}

export const follow = (userId:number) => {
    return async (dispatch:any) => {
        let apiMethod =  usersAPI.follow.bind(usersAPI);
        let actionCreator =followSucess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export const unfollow = (userId:number) => {
    return async (dispatch:any) => {
        let apiMethod =  usersAPI.unfollow.bind(usersAPI);
        let actionCreator =unfollowSucess;

        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export  default usersReducer;