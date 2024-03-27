// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVKCBN14cSpf5cwuyaadFnEHP9kXMoA0E",
  authDomain: "evidence-6e864.firebaseapp.com",
  projectId: "evidence-6e864",
  storageBucket: "evidence-6e864.appspot.com",
  messagingSenderId: "533672017602",
  appId: "1:533672017602:web:b556fc02a249499fbc055b",
  measurementId: "G-8QQ48DN42X"
};

// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;