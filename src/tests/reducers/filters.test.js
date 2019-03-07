import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const action = filtersReducer(undefined, {type: '@@INIT'});
    expect(action).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should setup sortByDate filter values', () => {
    const action = filtersReducer({
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }, {type: 'SORT_BY_DATE'});
    expect(action.sortBy).toBe('date');
});

test('should setup text filter values', () => {
    const action = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text: 'Test'});
    expect(action.text).toBe('Test');
});

test('should setup sortByAmount filter values', () => {
    const action = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(action.sortBy).toBe('amount');
});

test('should setup start date filter values', () => {
    const startDate = moment();
    const action = filtersReducer(undefined, {type: 'SET_START_DATE', startDate});
    expect(action.startDate).toEqual(startDate);
});

test('should setup end date filter values', () => {
    const endDate = moment();
    const action = filtersReducer(undefined, {type: 'SET_END_DATE', endDate});
    expect(action.endDate).toEqual(endDate);
});