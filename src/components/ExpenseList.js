import React from 'react';
import { connect } from 'react-redux';
import ExpenseItem from './ExpenseItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        { props.expenses.length === 0 ? (
            <p>No expenses</p>
        ) : (
            props.expenses.map((expense) => (
            <ExpenseItem
                key={expense.id}
                {...expense}
                />
            ))
        )}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters) // only pass the filtered expenses by passing them through the filter selectExpenses()
    }
};

export default connect(mapStateToProps)(ExpenseList);