import React from 'react';
import { connect } from 'react-redux';
import ExpenseItem from './ExpenseItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div className="container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            { props.expenses.length === 0 ? (
                <div className="list-item list-item__message">
                    <span>No Expenses</span>
                </div>
            ) : (
                props.expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    {...expense}
                    />
                ))
            )}
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters) // only pass the filtered expenses by passing them through the filter selectExpenses()
    }
};

export default connect(mapStateToProps)(ExpenseList);