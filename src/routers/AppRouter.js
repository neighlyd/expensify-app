import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

import AddExpensePage from '../components/AddExpense';
import EditExpensePage from '../components/EditExpense';
import ExpenseDashboardPage from '../components/ExpenseDashboard';
import Header from '../components/Header';
import HelpPage from '../components/Help';
import LoginPage from '../components/LoginPage'
import NotFoundPage from '../components/NotFound';


const AppRouter = () => (
    <Router>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route path="/dashboard" component={ExpenseDashboardPage}/>
                <Route path="/create" component={AddExpensePage}/>
                <Route path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>    
);

export default AppRouter;