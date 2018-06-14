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

export function checkUsername(name) {
  return new Promise((resolve, reject) => {
    db.ref('usernames').child(name).once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          reject( { message: 'Username Exist' });
        } else {
          resolve();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}