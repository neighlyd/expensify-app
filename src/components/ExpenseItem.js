import React from 'react';
import { connect } from 'react-redux';

import { removeExpense } from '../actions/expenses';


const ExpenseItem = ({ dispatch, id, description, amount, createdAt }) => (
    <div>
        <h3>Description: { description}</h3>
        <p>Amount: ${ amount}</p>
        <p>Created At: { createdAt}</p>
        <button onClick={(e) => dispatch(removeExpense({ id }))}>Remove</button>
        <hr/>
    </div>
);

export default connect()(ExpenseItem);