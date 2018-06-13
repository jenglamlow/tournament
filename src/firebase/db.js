import {
  db
} from './firebase';

// User API

export const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const getUsers = () =>
  db.ref('users').once('value');

export const checkUsername = (name) =>
  db.ref('usernames').child(name).once('value')
    .then((snapshot) => {
      snapshot.exists();
    });

export function isUsernameExist(name) {
  return new Promise((resolve, reject) => {
    db.ref('usernames').child(name).once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve('exist');
        } else {
          resolve();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}