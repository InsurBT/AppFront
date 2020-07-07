import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createBrowserHistory from 'history/createBrowserHistory';
import './index.css'
import "./assets/css/material-dashboard-react.css?v=1.9.0";


const customHistory = createBrowserHistory();

ReactDOM.render(    
                        <Router history={customHistory}>
                            <App history={customHistory}/>
                        </Router>
                    
                    ,
                 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
