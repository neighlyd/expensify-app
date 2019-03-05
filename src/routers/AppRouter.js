import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

import AddExpensePage from '../components/AddExpense';
import EditExpensePage from '../components/EditExpense';
import ExpenseDashboardPage from '../components/Dashboard';
import Header from '../components/Header';
import HelpPage from '../components/Header';
import NotFoundPage from '../components/NotFound';


const AppRouter = () => (
    <Router>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={ExpenseDashboardPage}/>
                <Route path="/create" component={AddExpensePage}/>
                <Route path="/edit" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>    
);

export default AppRouter;