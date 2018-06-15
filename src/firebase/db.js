import {
  db
} from './firebase';

// User API
export const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const createUsername = (username, id) =>
  db.ref(`usernames`).child(username).set(id);

export const getUsername = (name) =>
  db.ref('usernames').child(name).once('value');

export function getEmail(name) {
  return db.ref('usernames').child(name).once('value');
}

export function isUserExist(name) {
  return new Promise((resolve, reject) => {
    getUsername(name)
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(error => {
        reject(error);
      });
    });
}
