import React from 'react';
import './index.css';

import reportWebVitals from './reportWebVitals';

import store from "./redux/redux-store";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

    <Provider store={store}>
        <App />
    </Provider>

);

reportWebVitals();
