import database from '../firebase/firebase'

// component calls action generator
// action generator returns a function
// component dispatches the function
// Redux middleware to run the function.
// function runs -> has the ability to dispatch other actions and do whatever it wants.

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData
        const expense = { description, note, amount, createdAt }

        const uid = getState().auth.uid

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

// REMOVE_EXPENSE
export const removeExpense = ( {id} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = (({id}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/expenses`).child(id).remove().then((ref) => {
            dispatch(removeExpense({id}))
        })
    }
})

// EDIT_EXPENSE

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

export const startEditExpense = ((id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid

        return database.ref(`users/${uid}/expenses`).child(id).update(updates).then((snapshot) =>{
            dispatch(editExpense(id, updates))
        })
    }
})

// SET_EXPENSES - used to set up our expenses array in the redux store once it is retrieved from the firebase data store.
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

export const startSetExpenses = () => {
    // Fetch all expense data once
    // Parse data into an array
    // Dispatch SET_EXPENSES with new data array

    return (dispatch, getState) => {
        const uid = getState().auth.uid

        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            const expenses = []
            
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setExpenses(expenses))
        })
    }
}