import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Signup from './../ui/Signup';
import Login from './../ui/Login';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';

const browserHistory = createHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const IsUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (IsUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/dashboard');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/');
    }
}

export const routes = (
 <Router history={browserHistory}>
     <Switch>
         <Route exact path="/" component={Login} />
         <Route path="/login" component={Login} />
         <Route path="/signup" component={Signup} />
         <Route path="/dashboard" component={Dashboard} />
         <Route path="*" component={NotFound} />
     </Switch>
 </Router>
 );