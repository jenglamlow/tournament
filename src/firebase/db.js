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

export const checkUsername = (username) => {
  db.ref('username').once('value');
};
