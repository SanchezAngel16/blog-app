import { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signUp } from "../../actions/authActions";
import Card from "../layout/Card";
import "./SignUp.css";

import "react-datepicker/dist/react-datepicker.css";
import SignUpForm from "./SignUpForm";

const SignUp = ({ signUp, uid }) => {
  const [formInputs, setFormInputs] = useState({
    name: "",
    profilePicUrl: "",
    dateOfBirth: "",
    genre: "",
    email: "",
    password: "",
  });

  const [profilePic, setProfilePic] = useState();

  const handleChange = (flag, value) => {
    switch (flag) {
      case "dateOfBirth":
        setFormInputs({
          ...formInputs,
          dateOfBirth: value,
        });
        break;
      case "profilePicUrl":
        const formData = new FormData();
        formData.append("file", value);
        formData.append("upload_preset", "a222roq3");
        setProfilePic(formData);
        
        // console.log(value);
        setFormInputs({
          ...formInputs,
          [flag]: URL.createObjectURL(value),
        });
        break;
      default:
        setFormInputs({
          ...formInputs,
          [flag]: value,
        });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sign up
    signUp(formInputs, profilePic);
    setFormInputs({
      name: "",
      dateOfBirth: "",
      profilePicUrl: "",
      genre: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      {uid && <Redirect to="/" />}
      <div className="signUp">
        <div className="signUp-brand">
          <img className="img-brand" src="/images/brand.svg" alt="" />
          <h2>Blog App</h2>
        </div>
        <Card>
          <SignUpForm
            formData={formInputs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <span className="signUp-alreadyMember">
            Already a member? <Link to="/login">Log In </Link>
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
    signUp: (formInputs, profilePic) => dispatch(signUp(formInputs, profilePic)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
