import {newsAPI, usersAPI} from "../api/api";
import {setUsersTotalCount} from "./users-reducer";

const SET_NEWS = 'SET_NEWS';
const SET_NEWS_TOTAL_COUNT = 'SET_NEWS_TOTAL_COUNT';
const SET_NEWS_PORTION = 'SET_NEWS_PORTION ';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

let initialState = {
    news: [],
    newsPortion: [],
    pageSize: 14,
    totalNewsCount: 0,
    currentPage: 1,
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS: {
            return { ...state, news: action.news}
        }

        case SET_NEWS_TOTAL_COUNT: {
            return { ...state, totalNewsCount: action.totalNewsCount}
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }

        case SET_NEWS_PORTION: {
            return { ...state,
                newsPortion: state.news.slice(action.viewedNews, action.viewedNews+ initialState.pageSize)}
        }
        default:
            return state
    }
}

export const setNews = (news) => ({type: SET_NEWS, news });
export const setNewsTotalCount = (totalNewsCount) =>({type: SET_NEWS_TOTAL_COUNT, totalNewsCount})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setNewsPortion = ( viewedNews) =>({type: SET_NEWS_PORTION, viewedNews});

export const getNews = () => {

    return async (dispatch) => {
        let response = await newsAPI.getPopularNews()


        dispatch(setNews(response.articles))
        dispatch(setNewsTotalCount(response.articles.length))

        dispatch(setNewsPortion ( 0))
    }
}
export default newsReducer;