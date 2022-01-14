import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "../../actions/authActions";
import "./Navbar.css";
import NavOption from "./NavOption";
import ProfilePicture from "./ProfilePicture";

const Navbar = ({ signOut, uid, user }) => {
  const handleSignOut = (e) => {
    if (uid) {
      toast.info("You signed out");
    }
    signOut();
  };

  return (
    <nav>
      <Link to="/posts">
        <div className="nav-brand">
          <img className="img-brand" src="/images/brand.svg" alt="" />
          <h2>Blog App</h2>
        </div>
      </Link>
      <div className="nav-options">
        {!uid ? (
          <div>
            <Link to="/login">
              <span className="nav-option-link">Sign In</span>
            </Link>
            <span> or </span>
            <Link to="/signup">
              <span className="nav-option-link">Sign Up</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/posts/create">
              <NavOption Icon="edit" />
            </Link>
            <Link to="/posts/favs">
              <NavOption Icon="bookmark" />
            </Link>
            <div className="nav-option-dropdown">
              <ProfilePicture src={user && user.profilePicUrl} imgSize="2em" iconSize="2em" isClickable={true} />
              <div className="nav-option-dropdown-content">
                <Link to="/login" onClick={handleSignOut}>
                  Sign Out
                </Link>
              </div>
            </div>
          </>
        )}
        {/* <NavOption Icon="account_circle" /> */}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  const uid = state.firebase.auth.uid;
  return {
    uid,
    user: state.firestore.data.users && state.firestore.data.users[uid],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
