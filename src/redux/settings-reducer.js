
const SET_THEME = 'SET_THEME';

let initialState = {
    theme: 'light'
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME : {
            return { ...state, theme: action.theme}
        }


        default:
            return state
    }
}

export const setTheme = (theme) => ({type: SET_THEME, theme });

export const getTheme = (theme) =>{

    document.documentElement.setAttribute('data-theme', theme)
    setTheme(theme)
}

export default settingsReducer;