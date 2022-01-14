import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CustomSwitch from "./components/utils/CustomSwitch";
import PageNotFound from "./components/utils/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Route path="/pageNotFound" component={PageNotFound} />
        <CustomSwitch>
          <Route
            exact
            path="/"
            render={
              (props) => <Redirect to="/posts" />
              // isUserLoggedIn() ? <Home {...props} /> : <Redirect to="/login" />
            }
          />
          <Route path="/posts">
            <Navbar />
            <Dashboard />
          </Route>
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </CustomSwitch>
      </BrowserRouter>
    </div>
  );
}

export default App;
