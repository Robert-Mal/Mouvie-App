// import {initializeApp} from 'firebase/app';
// import {getAuth} from 'firebase/auth';
// import {getFirestore} from 'firebase/firestore';
import {initializeApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_Ys02Vo9Ccg2ywAoCqT8DUW0y-94cznE',
  authDomain: 'movieapp-e92e8.firebaseapp.com',
  projectId: 'movieapp-e92e8',
  storageBucket: 'movieapp-e92e8.appspot.com',
  messagingSenderId: '864932842274',
  appId: '1:864932842274:web:2581f078382181b1c4f37b',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore();
