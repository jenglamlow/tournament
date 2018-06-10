import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {

};

const devConfig = {

};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export {
  db,
  auth,
};