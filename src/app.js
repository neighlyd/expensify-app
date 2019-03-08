import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(addExpense({description: 'coffee bill', amount: 50000000, createdAt: 10000}));
store.dispatch(addExpense({description: 'gas bill', amount: 65732, createdAt: -10000}));
store.dispatch(addExpense({description: 'rent', amount: 2, createdAt: 55555}));

const state = store.getState();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));