import Card from "../layout/Card";
// import ProfilePicture from "../layout/ProfilePicture";
import "./PostDetails.css";
// import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
// import { compose } from "redux";
import { withRouter } from "react-router";
import moment from "moment";
import UserInfo from "./UserInfo";

const PostDetails = ({ post }) => {
  return (
    <div className="postDetails-container">
      {post ? (
        <Card>
          <div className="postDetails-header">
            <h1>{post.title}</h1>
            <div className="postDetails-headerInfo">
              {/* <ProfilePicture iconSize="2em" />
              <div className="postDetails-authorInfo">
                <p>User name</p>
                <p>{moment(post.createdAt.toDate()).calendar()}</p>
              </div> */}
              <UserInfo uid={post.authorId}>
              <p>{moment(post.createdAt.toDate()).calendar()}</p>
              </UserInfo>
              <span className="material-icons">bookmark_border</span>
            </div>

          </div>
          <div className="postDetails-body">
            <img src="" alt="" />
            <p>{post.content}</p>
          </div>
        </Card>
      ) : (
        <h3>Loading post...</h3>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  // console.log(state);
  return {
    post:
      state.firestore.data.posts &&
      state.firestore.data.posts[props.match.params.id],
  };
};

export default withRouter(connect(mapStateToProps)(PostDetails));

// export default withRouter(
//   compose(
//     firestoreConnect((props) => [
//       { collection: "posts", doc: props.match.params.id },
//     ]),
//     connect(mapStateToProps)
//   )(PostDetails)
// );
