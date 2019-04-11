import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../actions/auth'

export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="container">
            <div className="header__content">
                <Link to="/dashboard" className="header__link">
                    <h1>Expenses</h1>
                </Link>
                <button onClick={ startLogout } className="button button__link">Logout</button>
            </div>
        </div>
    </header>
)

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout)
})

export default connect(undefined, mapDispatchToProps)(Header);