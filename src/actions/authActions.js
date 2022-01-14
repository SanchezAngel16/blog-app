import { actionTypes } from "redux-firestore";
import Axios from "axios";

export const signIn = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        dispatch({
          type: "SIGN_IN",
        });
      })
      .catch((err) => {
        dispatch({
          type: "SIGN_IN_ERR",
          err,
        });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: "SIGN_OUT",
        });
        dispatch({
          type: actionTypes.CLEAR_DATA,
        });
      });
  };
};

export const signUp = (formInputs, profilePic) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    console.log(formInputs);
    console.log(profilePic);

    firebase
      .auth()
      .createUserWithEmailAndPassword(formInputs.email, formInputs.password)
      .then((userCredential) => {
        const user = userCredential.user;
        firestore
          .collection("users")
          .doc(user.uid)
          .set({
            uid: user.uid,
            name: formInputs.name,
            email: formInputs.email,
            genre: formInputs.genre,
            dateOfBirth: formInputs.dateOfBirth,
            profilePicUrl: ""
          })
          .then(() => {
            if (profilePic) {
              Axios.post(
                "https://api.cloudinary.com/v1_1/dcoecd0b4/image/upload",
                profilePic
              ).then((response) => {
                console.log(response.data.url);
                if (response.data.url) {
                  firestore.collection("users").doc(user.uid).update({
                    profilePicUrl: response.data.url,
                  });
                }
              });
            }
            dispatch({
              type: "SIGN_UP",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "SIGN_UP_ERR",
          err,
        });
      });
  };
};
