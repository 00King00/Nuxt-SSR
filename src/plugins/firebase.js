import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
    const config = {
		apiKey: "AIzaSyAcFXpJiet790i9nV__lEANexEwbnAgaIQ",
		authDomain: "movie-list-ssr.firebaseapp.com",
		databaseURL: "https://movie-list-ssr.firebaseio.com",
		projectId: "movie-list-ssr",
		storageBucket: "movie-list-ssr.appspot.com",
		messagingSenderId: "276174071771"
    }
    firebase.initializeApp(config)
}
const fireDb = firebase.firestore()
export default fireDb
