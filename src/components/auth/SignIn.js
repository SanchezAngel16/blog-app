import { useState } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../actions/authActions";
import Card from "../layout/Card";
import CustomButton from "../layout/CustomButton";
import "./SignIn.css";

const SignIn = ({ signIn, uid }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log in
    signIn(formData);
  };

  return (
    <div>
      {uid && <Redirect to="/" />}
      <div className="login">
        <Card>
          <div className="login-brand">
            <img className="img-brand" src="/images/brand.svg" alt="" />
            <h2>Blog App</h2>
          </div>

          <form className="login-form">
            <label className="login-label" htmlFor="">
              Email
            </label>
            <input type="email" name="email" onChange={handleChange} />
            <label className="login-label" htmlFor="">
              Password
              <span>
                <Link to="/login">Forgot?</Link>
              </span>
            </label>
            <input type="password" name="password" onChange={handleChange} />
            <CustomButton text="Login" OnClick={handleSubmit} type="submit" />
          </form>

          <span className="login-notMember">
            Not a member? <Link to="/signUp">Register now </Link>
          </span>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
