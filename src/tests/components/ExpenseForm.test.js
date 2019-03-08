import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render expense form without data', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense form with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    // get snapshot without error.
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('Please provide description and amount');
    expect(wrapper.find('p').text()).toBe('Please provide description and amount');
    expect(wrapper).toMatchSnapshot();
})

test('should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />)
    const value = 'New Description';

    wrapper.find('input').at(0).simulate('change', {
        target:{ value }
    })
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on input change', () => {
    const wrapper = shallow(<ExpenseForm />)
    const value = 'New Note';

    wrapper.find('textarea').simulate('change', {
        target:{ value }
    })
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount on input change with valid amount', () => {
    const wrapper = shallow(<ExpenseForm />)
    const value = '100.28';

    wrapper.find('input').at(1).simulate('change', {
        target:{ value }
    })
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount on input change with invalid amount', () => {
    const wrapper = shallow(<ExpenseForm />)
    const value = '10a0.287';

    wrapper.find('input').at(1).simulate('change', {
        target:{ value }
    })
    expect(wrapper.state('amount')).not.toBe(value);
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)
    
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({ 
        description: expenses[0].description, 
        amount: expenses[0].amount, 
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    })
    // const value = '100.28';
    // const description = 'Test Description';

});

test('should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const now = moment();
    
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const focused = true;
    
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBeTruthy();
});