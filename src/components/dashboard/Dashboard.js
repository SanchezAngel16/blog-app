import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Route, useRouteMatch } from "react-router";
import { compose } from "redux";
import CreatePost from "../posts/CreatePost";
import FavPostsList from "../posts/FavPostsList";
import PostDetails from "../posts/PostDetails";
import PostsList from "../posts/PostsList";
import CustomSwitch from "../utils/CustomSwitch";

const Dashboard = ({ uid }) => {
  let { path } = useRouteMatch();

  return (
    <div className="dashboard">
      {/* {!uid && <Redirect to="/login" />} */}
      <CustomSwitch>
        <Route exact path={path}>
          <PostsList />
        </Route>
        <Route exact path={`${path}/create`}>
          <CreatePost />
        </Route>
        <Route exact path={`${path}/favs`}>
          <FavPostsList />
        </Route>
        <Route exact path={`${path}/:id`}>
          <PostDetails />
        </Route>
      </CustomSwitch>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    uid: state.firebase.auth.uid,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((ownProps) => [
    {
      collection: "usersRecord",
      doc: ownProps.uid,
    },
    {
      collection: "posts",
      orderBy: ["createdAt", "desc"],
    },
    {
      collection: "users",
      doc: ownProps.uid,
    }
  ])
)(Dashboard);


// export default connect(mapStateToProps, null)(Dashboard);
