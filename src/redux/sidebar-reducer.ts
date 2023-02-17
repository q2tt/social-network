let initialStore = {}

type InitialStateType = typeof initialStore;

const sidebarReducer = (state = initialStore, action:any):InitialStateType => {
    return state
}

export default  sidebarReducer