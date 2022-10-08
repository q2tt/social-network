const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialStore = {
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
}

export const dialogsReducer = (state = initialStore, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:

       return {
           ...state, newMessageBody: action.body
       }
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({id: 5, message: body});
            return {
                ...state
            }


        default:
                return state;
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE});

export const updateNewMessageBodyCreator = (body) =>
     ({type: UPDATE_NEW_MESSAGE_BODY, body: body})


export  default dialogsReducer;