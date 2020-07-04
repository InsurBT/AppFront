import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
//REDUUX
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import reducer from './redux/reducer/reducer'
/************************************************* */
import createBrowserHistory from 'history/createBrowserHistory';
import './index.css'
import "./assets/css/material-dashboard-react.css?v=1.9.0";

// REDUX STORE
const store = createStore(reducer)
store.subscribe(()=> console.log(store.getState()))
const customHistory = createBrowserHistory();

ReactDOM.render(    <Provider store={store}>
                        <Router history={customHistory}>
                            <App history={customHistory}/>
                        </Router>
                    </Provider>
                    ,
                 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
