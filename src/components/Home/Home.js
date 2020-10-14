import React, { useState } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import About from '../About/About';
import { NoMatch } from '../NoMatch/NoMatch';
import Login from '../Login/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


export const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    return(
        <Router>
            <NavigationBar 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
                accessToken={accessToken}
                setAccessToken={setAccessToken}
            />
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/about" component={About} />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    )
}
