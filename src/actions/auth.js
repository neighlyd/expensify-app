import { firebase, googleAuthProvider } from '../firebase/firebase'

export const startLogout = () => {
    return firebase.auth().signOut()
}

export const startLogin = () => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
}