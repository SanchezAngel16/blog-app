export const addPost = (post) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    if (authorId) {
      console.log("posting...");
      firestore
        .collection("posts")
        .add({
          ...post,
          authorId: authorId,
          createdAt: new Date(),
        })
        .then(() => {
          dispatch({
            type: "ADD_POST",
            post,
          });
        })
        .catch((error) => {
          dispatch({
            type: "ADD_POST_ERROR",
            error,
          });
        });
    } else {
      dispatch({
        type: "ADD_POST_AUTH_ERROR",
      });
    }
  };
};

export const savePost = (postId, isSaved) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();
    const userId = getState().firebase.auth.uid;
    if (userId) {
      console.log(postId);
      var userRecordRef = firestore.collection("usersRecord").doc(userId);
      userRecordRef
        .set(
          {
            favs: isSaved
              ? firebase.firestore.FieldValue.arrayRemove(postId)
              : firebase.firestore.FieldValue.arrayUnion(postId),
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: "SAVE_POST",
            wasAlreadySaved: isSaved
          });
        });
    } else {
      dispatch({
        type: "SAVE_POST_AUTH_ERROR",
      });
    }
  };
};
