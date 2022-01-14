import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import rootReducer from "./reducers/rootReducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import firebase from "./config/firebaseConfig";
import { Provider } from "react-redux";
import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk.withExtraArgument({
      getFirebase,
    })
  )
);

const rrfProps = {
  firebase: firebase,
  config: {
    enableRedirectHandling: false,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) {
    return (
      <div>
        <div style={{ width: "100%", height: "100vh" }} role="status">
          <span>Loading...</span>
        </div>
      </div>
    );
  }
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
