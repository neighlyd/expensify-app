import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startLogout = () => {
    return firebase.auth().signOut()
}

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogin = () => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
}