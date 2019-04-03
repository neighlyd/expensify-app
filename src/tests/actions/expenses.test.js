import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase'

import { startAddExpense, addExpense, removeExpense, editExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk])

beforeEach(async () => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    })
    await database.ref('expenses').set(expensesData)
})


test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', {description: 'Test'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates:{
            description: 'Test'
        }
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', async () => {
    const store = createMockStore({})
    const expenseData = {
        description: 'Mouse',
        amount: 23000,
        note: 'This is a mouse',
        amount: 38128,
        createdAt: 0
    }

    await store.dispatch(startAddExpense(expenseData))
    const actions = store.getActions()
    const snapshot = await database.ref(`expenses/${actions[0].expense.id}`).once('value')
    
    expect(snapshot.val()).toEqual(expenseData)
    expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    })
})

test('should add expense with defaults to database and store', async () => {
    const store = createMockStore({})
    const expenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }

    await store.dispatch(startAddExpense({}))
    const actions = store.getActions()
    const snapshot = await database.ref(`expenses/${actions[0].expense.id}`).once('value')
    
    expect(snapshot.val()).toEqual(expenseData)
    expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    })
})

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });