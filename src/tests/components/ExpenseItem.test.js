import React from 'react';
import { shallow } from 'enzyme';

import ExpenseItem from '../../components/ExpenseItem';
import expenses from '../fixtures/expenses';

test('should render expense item', () => {
    const wrapper = shallow(<ExpenseItem {...expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
})