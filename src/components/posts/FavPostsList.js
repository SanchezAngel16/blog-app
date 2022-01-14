import Post from "./Post";
// import { compose } from "redux";
import { connect } from "react-redux";
// import { firestoreConnect } from "react-redux-firebase";

const FavsPostsList = ({ userRecord, uid }) => {
  return (
    <div>
      {/* {userRecord && console.log(userRecord[0].favs)} */}
      {!uid ? (
        <h3>Login to see your saved posts</h3>
      ) : (
        userRecord &&
        userRecord.length > 0 &&
        userRecord[0].favs.map((post) => {
          return <Post key={post} id={post} />;
        })
        // console.log(userRecord.length > 0),
        // userRecord &&
        //
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const userRecord = state.firestore.ordered.usersRecord;
  const uid = state.firebase.auth.uid;
  console.log(userRecord);
  // console.log(userRecord);
  // // console.log(uid);
  // //   console.log(userRecord);
  // console.log(userRecord);
  return {
    userRecord: userRecord,
    uid: uid,
  };
};

export default connect(mapStateToProps)(FavsPostsList);

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect((ownProps) => [
//     {
//       collection: "usersRecord",
//       doc: ownProps.uid,
//       //   orderBy: ["createdAt", "desc"],
//     },
//   ])
// )(FavsPostsList);
