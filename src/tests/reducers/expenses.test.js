import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should setup default empty expense array', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([])
});

test('should add expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            description: 'Test Expense',
            amount: 9999,
            note: 'Test Note',
            createdAt: 0
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, action.expense])
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense with invalid id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '16'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should edit expense by id', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            description: 'Updated Expense Description'
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state[1].description).toEqual(action.updates.description);
});

test('should not edit expense with invalid id', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '16',
        updates: {
            description: 'Updated Expense Description'
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state[1].description).not.toEqual(action.updates.description);
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[1]])
})