import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Link } from 'react-router-dom';


const ExpenseItem = ({ dispatch, id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>
            { numeral(amount / 100).format('$0,0.00') }
             - 
            { moment(createdAt).format('MMM Do, YYYY') }
        </p>        
        <hr/>
    </div>
);

export default ExpenseItem;