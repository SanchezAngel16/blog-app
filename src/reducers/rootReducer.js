import { combineReducers } from "redux";
import { firebaseReducer} from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import postReducer from "./postReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    postReducer,
    authReducer
});

export default rootReducer;