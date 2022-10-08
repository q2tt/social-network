import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";



let store = {
    _state: {
        profilePage: {
            posts : [
                {id: 1, message: 'hi', like: 12},
                {id: 2, message: 'My baby', like: 19},
                {id: 3, message: 'Alona', like: 12}
            ],
            newPostText: 'la-la-la'
        },
        messagePage: {

            dialogs: [
                {id: 1, name: 'Alona'},
                {id: 2, name: 'Sania'},
                {id: 3, name: 'Kiril'},
                {id: 4, name: 'Anton'}
            ],

            messages : [
                {id: 1, message: 'hi'},
                {id: 2, message: 'how are you?'},
                {id: 3, message: 'yo'},
                {id: 4, message: 'yo'}
            ],

            newMessageBody: '',
        },
        sidebar:{}
    },

    getState(){
        return this._state
    },

    _callSubscriber () {
        console.log(1)
    },

    subscribe (observer) {
        this._callSubscriber = observer;
    },


    dispatch (action){
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagePage = dialogsReducer(this._state.messagePage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)


    }


}


window.store= store;

export default store;