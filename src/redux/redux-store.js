import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import newsReducer from "./news-reduser";
import thunkMiddleware from 'redux-thunk';
// import appReducer from "./app-reducer";
import appReducer from "./app-reducer";
import settingsReducer from "./settings-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagePage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    news: newsReducer,
    settings: settingsReducer
});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export  default store;