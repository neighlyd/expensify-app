const expenses = [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 999,
    createdAt: -1000
}, {
    id: '3',
    description: 'Lunch',
    note: '',
    amount: 150,
    createdAt: 1000
}]

export default ((expenses) => {
    if (expenses.length === 0){
        return 0
    }
    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, value) => sum + value, 0)
})