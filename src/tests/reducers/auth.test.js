import authReducer from '../../reducers/auth'

test('should setup empty auth object', () => {
    const state = authReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual({})
})

test('should add uid on login', () => {
    const action = {
        type: 'LOGIN',
        uid: 123
    }

    const state = authReducer(undefined, action)
    expect(state.uid).toBe(action.uid)
})

test('should remove uid on logout', () => {
    const action = {
        type: 'LOGOUT'
    }

    const state = authReducer({uid: 123}, action)
    expect(state).toEqual({})
})