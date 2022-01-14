import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import ProfilePicture from "../layout/ProfilePicture";
import "./UserInfo.css";

const UserInfo = ({ author, children }) => {
  return (
    <div className="user-info">
      <ProfilePicture src={ author && author.profilePicUrl} imgSize="2em" isClickable={true} iconSize="2em" />
      <div className="user-infoDetails">
        <p>
          Published by <span>{author && author.name}</span>
        </p>
        {children}
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect((props) => [{ collection: "users", doc: props.uid }]),
  connect(({ firestore: { data } }, props) => ({
    author: data.users && data.users[props.uid],
  }))
)(UserInfo);
