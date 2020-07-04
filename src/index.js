import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
//REDUUX
import { createStore , combineReducers } from 'redux'
import {Provider} from 'react-redux'
// Les reducers
import dossierReducer from './redux/reducer/dossierReducer'
import assuresReducers from './redux/reducer/assuresReducer'
import prestationReducer from './redux/reducer/prestationReducer'
import ayantsDroitReducer from './redux/reducer/ayantsDroitReducer'
/************************************************* */
import createBrowserHistory from 'history/createBrowserHistory';
import './index.css'
import "./assets/css/material-dashboard-react.css?v=1.9.0";

// REDUX STORE
export const store = createStore(combineReducers({dossierReducer,
                                            assuresReducers,
                                            prestationReducer , 
                                            ayantsDroitReducer}
                                        ))

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
