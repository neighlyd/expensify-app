import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase'
import { 
    startAddExpense, 
    addExpense, 
    removeExpense, 
    editExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense, 
    startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk])
const uid = 'testUID123'
const defaultAuthState = { auth: { uid }}

beforeEach(async () => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    })
    await database.ref(`users/${uid}/expenses`).set(expensesData)
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});


test('should remove expense from firebase', async () => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[0].id
    await store.dispatch(startRemoveExpense({id}))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
    })

    const snapshot = await database.ref(`users/${uid}/expenses`).child(id).once('value')
    expect(snapshot.val()).toBeFalsy()
})

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

test('should edit expense in firebase', async () => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[0].id
    const updates = {
        description: 'Updated Description',
        note: 'Updated Note'
    }

    await store.dispatch(startEditExpense(id, updates))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
    })
    const snapshot = await database.ref(`users/${uid}/expenses`).child(id).once('value')
    // Changed what we wanted, didn't change what we didn't want.
    expect(snapshot.val().description).toBe(updates.description)
    expect(snapshot.val().amount).toBe(expenses[0].amount)
})

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', async () => {
    const store = createMockStore(defaultAuthState)
    const expenseData = {
        description: 'Mouse',
        amount: 23000,
        note: 'This is a mouse',
        amount: 38128,
        createdAt: 0
    }

    await store.dispatch(startAddExpense(expenseData))
    const actions = store.getActions()
    const snapshot = await database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    
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
    const store = createMockStore(defaultAuthState)
    const expenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }

    await store.dispatch(startAddExpense({}))
    const actions = store.getActions()
    const snapshot = await database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    
    expect(snapshot.val()).toEqual(expenseData)
    expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    })
})

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', async () => {
    const store = createMockStore(defaultAuthState)
    await store.dispatch(startSetExpenses())
    const actions = store.getActions()

    expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})