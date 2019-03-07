import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';


const ExpenseItem = ({ dispatch, id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}><h3>Description: { description}</h3></Link>
        <p>Amount: ${ amount / 100}</p>
        <p>Created At: { moment(createdAt).format('MMM Do, YYYY') }</p>
        
        <hr/>
    </div>
);

export default ExpenseItem;