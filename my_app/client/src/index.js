import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './components/Homepage.js';
import Product from './components/Product.js';
import UserProfile from './components/UserProfile.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/homepage" component={Homepage} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />


        </div>
    </Router>,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
