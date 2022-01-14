import Post from "./Post";
// import { compose } from "redux";
import { connect } from "react-redux";
// import { firestoreConnect } from "react-redux-firebase";

const PostsList = ({ posts, userRecord, uid, ids }) => {
  return (
    <div>
      {posts &&
        posts.map((post) => {
          // const saved = false;
          // // if (userRecord && uid) {
          // //   console.log(userRecord[0].favs);
          // //   const fav = userRecord[0].favs.filter(
          // //     (postId) => postId === post.id
          // //   );
          // //   if (fav) {
          // //     saved = true;
          // //   }
          // // }
          return <Post key={post.id} {...post} />;
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  const posts = state.firestore.ordered.posts;
  const userRecord = state.firestore.ordered.usersRecord;
  const uid = state.firebase.auth.uid;
  return {
    posts: posts,
    userRecord,
    uid,
  };
};

export default connect(mapStateToProps)(PostsList);

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect((ownProps) => [
//     {
//       collection: "posts",
//       // where: ["authorId", "==", ownProps.id],
//       orderBy: ["createdAt", "desc"],
//     },
//   ])
// )(PostsList);
