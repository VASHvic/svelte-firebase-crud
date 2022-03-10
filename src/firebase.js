import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDimTuZIEyZucHB6dVNALHZTo0gGOTeThY',
  authDomain: 'svelte-crud-df7e6.firebaseapp.com',
  projectId: 'svelte-crud-df7e6',
  storageBucket: 'svelte-crud-df7e6.appspot.com',
  messagingSenderId: '708400036461',
  appId: '1:708400036461:web:8d045ebce8d2ca031a1d64',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
