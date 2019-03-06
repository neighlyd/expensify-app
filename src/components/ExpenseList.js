import React from 'react';
import { connect } from 'react-redux';
import ExpenseItem from './ExpenseItem';
import selectExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
    <div>
        <h1>This is the Expense List Component.</h1>
        <div>{props.expenses.map((expense) => (
            <ExpenseItem
                key={expense.id}
                {...expense}
                />
            ))
        }</div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters) // only pass the filtered expenses by passing them through the filter selectExpenses()
    }
};

export default connect(mapStateToProps)(ExpenseList);