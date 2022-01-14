import Card from "../layout/Card";
import "./Post.css";
import { Redirect } from "react-router-dom";
import moment from "moment";
import UserInfo from "./UserInfo";
import { connect } from "react-redux";
import { useState } from "react";
import SavePost from "./SavePost";
// import { compose } from "redux";
// import { firestoreConnect } from "react-redux-firebase";

const Post = ({ id, post }) => {
  const [redirect, setRedirect] = useState(false);

  const handleViewPostDetails = (e) => {
    e.preventDefault();
    console.log("Test parent");
    setRedirect(true);
  };


  return (
    <div className="post-container">
      {redirect && <Redirect to={`/posts/${id}`} />}
      {post && (
        <Card handleOnClick={handleViewPostDetails}>
          <div className="card-post">
            <div className="card-post-coverPhoto"></div>
            <div className="card-post-info">
              {/* <div className="card-post-header">
                <ProfilePicture isClickable={true} iconSize="2em" />
                <p>
                  Published by <span>Ángel Sánchez</span>
                </p>
              </div> */}
              <UserInfo uid={post.authorId} />

              <div className="card-post-body">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
              </div>

              <div className="card-post-footer">
                <span>{moment(post.createdAt.toDate()).calendar()}</span>
                {/* <span
                    className="material-icons"
                    onClick={handleSavePost}
                  >
                    bookmark_border
                  </span> */}
                <SavePost postId={id}/>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    post:
      state.firestore.data.posts &&
      state.firestore.data.posts[props.id],
  };
};



export default connect(mapStateToProps)(Post);

// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   firestoreConnect((ownProps) => [
//     // {
//     //   collection: "posts",
//     //   // where: ["authorId", "==", ownProps.id],
//     //   orderBy: ["createdAt", "desc"],
//     // },
//   ])
// )(Post);

