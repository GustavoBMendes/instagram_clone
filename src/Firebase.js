import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDGv858fCpa7ee1Ws7n1zEkREUyeTfchlQ",
    authDomain: "instaclone-3b084.firebaseapp.com",
    databaseURL: "https://instaclone-3b084.firebaseio.com",
    projectId: "instaclone-3b084",
    storageBucket: "instaclone-3b084.appspot.com",
    messagingSenderId: "530990536179",
    appId: "1:530990536179:web:c5c6f51b4cac3d21d8ae86",
    measurementId: "G-1EES1800BY"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
