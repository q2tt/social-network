import {usersAPI} from "../api/api";
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
          ],
    pageSize: 25,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: false,
    followingInProgress: [ ]
}
export const usersReducer = (state = initialState, action) => {


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

export const followSucess = (userId) => ({type: FOLLOW , userId});

export const unfollowSucess = (userId) => ({type: UNFOLLOW, userId});

export const setUsers = (users) => ({type: SET_USERS, users });

export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});

export const setUsersTotalCount = (totalUsersCount) => ({type: SET_USERS_TOTAL_COUNT, count: totalUsersCount});

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const followingInProgressA = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});


export const getUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        let response = await usersAPI.getUsers(page, pageSize)
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(response.items));
                dispatch(setUsersTotalCount(response.totalCount))
    }
}
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFetching(true))
    let response = await apiMethod(userId)
    if(response.data.resultCode === 0){
        dispatch( actionCreator(userId))
    }
    dispatch(toggleIsFetching(false))
}

export const follow = (userId) => {
    return async (dispatch) => {
        let apiMethod =  usersAPI.follow.bind(usersAPI);
        let actionCreator =followSucess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        let apiMethod =  usersAPI.unfollow.bind(usersAPI);
        let actionCreator =unfollowSucess;

        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export  default usersReducer;