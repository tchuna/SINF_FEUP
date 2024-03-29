import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './components/Homepage.js';
import Product from './components/Product.js';
import UserProfile from './components/UserProfile.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Category from './components/Category.js';
import Search from './components/Search.js';
import ShoppingCart from './components/ShoppingCart.js';


import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/homepage" component={Homepage} />
            <Route exact path="/products/:id" component={Product} />
            <Route exact path="/profile/:id" component={UserProfile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/search/:id" component={Search} />
            <Route exact path="/category/:category" component={Category} />
            <Route exact path="/cart" component={ShoppingCart} />
        </div>
    </Router>,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
