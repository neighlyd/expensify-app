import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import AddExpensePage from '../components/AddExpense'
import EditExpensePage from '../components/EditExpense'
import ExpenseDashboardPage from '../components/ExpenseDashboard'
import LoginPage from '../components/LoginPage'
import NotFoundPage from '../components/NotFound'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory()

const AppRouter = () => (
    <Router history={ history }>
        <div>
            <Switch>
                <PublicRoute exact path="/" component={LoginPage}/>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
                <PrivateRoute path="/create" component={AddExpensePage}/>
                <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>    
);

export default AppRouter