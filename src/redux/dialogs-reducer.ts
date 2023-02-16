const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
   id: number
   name: string
}

type MessageType = {
    id: number
    message: string
 }

let initialStore = {
    dialogs: [
        {id: 1, name: 'Alona'},
        {id: 2, name: 'Sania'},
        {id: 3, name: 'Kiril'},
        {id: 4, name: 'Anton'}
    ] as Array <DialogType>,

    messages : [
        {id: 1, message: 'hi'},
        {id: 2, message: 'how are you?'},
        {id: 3, message: 'yo'},
        {id: 4, message: 'yo'}
    ]as Array <MessageType>,

    newMessageBody: '',
}

export type initialStoreType = typeof initialStore;

export const dialogsReducer = (state = initialStore, action:any) :initialStoreType => {

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

type SendMessageCreatorType = {
    type: typeof  SEND_MESSAGE
}

export const sendMessageCreator = ():SendMessageCreatorType => ({type: SEND_MESSAGE});

type UpdateMessageBodyType = {
    type: typeof  UPDATE_NEW_MESSAGE_BODY
    body: string
} 

export const updateNewMessageBodyCreator = (body: string):UpdateMessageBodyType =>
     ({type: UPDATE_NEW_MESSAGE_BODY, body: body})


export  default dialogsReducer;