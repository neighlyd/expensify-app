import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'


export const ExpensesSummary = ({ hiddenExpenses, expenseCount, expensesTotal }) => {
    const filteredExpenseWord = expenseCount === 1 ? 'expense' : 'expenses'
    const hiddenExpenseWord = hiddenExpenses === 1 ? 'expense' : 'expenses'
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00')
    
    return (
        <div className="page-header">
            <div className="container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {filteredExpenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
                <p className="page-header__sub-title">(Hiding {hiddenExpenses} {hiddenExpenseWord})</p>
                <div className="page-header__actions">
                    <Link to="/create" className="button">Create Expense
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    const hiddenExpenses = state.expenses.length - visibleExpenses.length
    
    return {
        hiddenExpenses,
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)
