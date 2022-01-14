import { useState } from "react";
import { connect } from "react-redux";
import { savePost } from "../../actions/postActions";

const SavePost = ({ postId, isSaved, savePost }) => {
  const [icon, setIcon] = useState(isSaved ? "bookmark" :"bookmark_border");

  const handleSavePost = (e) => {
    e.stopPropagation();
    savePost(postId, isSaved);
  };


  return (
    <span
      className="material-icons"
      onClick={handleSavePost}
      onMouseEnter={() => setIcon("bookmark")}
      onMouseLeave={() => setIcon(isSaved ? "bookmark" : "bookmark_border")}
    >
      {icon}
    </span>
  );
};

const mapStateToProps = (state, props) => {
  const userRecord = state.firestore.ordered.usersRecord;
  console.log(userRecord);
  const uid = state.firebase.auth.uid;
  let isSaved = false;
  if (userRecord && uid) {
    if(userRecord[0]){
      const result = userRecord[0].favs.filter(
        (postId) => postId === props.postId
      );
      if (result.length > 0) {
        isSaved = true;
      }
    }
  }
  return {
    isSaved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    savePost: (postId, isSaved) => dispatch(savePost(postId, isSaved)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavePost);
