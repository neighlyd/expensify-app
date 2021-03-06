import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpense';
import expenses from '../fixtures/expenses';

let expense, history, wrapper, startEditExpense, startRemoveExpenses;

beforeEach(() => {
    history = { push: jest.fn() };
    expense = expenses[0];
    startEditExpense = jest.fn();
    startRemoveExpenses = jest.fn();
    wrapper = shallow(<EditExpensePage expense={expense} history={history} startEditExpense={startEditExpense} startRemoveExpense={startRemoveExpenses}/>)
});

test('should render EditExpense correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    const id = expense.id;
    wrapper.find('ExpenseForm').prop('onSubmit')(expense)
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenCalledWith(id, expense)
})

test('should handle onClick to remove expense', () => {
    wrapper.find('button').simulate('click')
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpenses).toHaveBeenLastCalledWith({id: expense.id});
})