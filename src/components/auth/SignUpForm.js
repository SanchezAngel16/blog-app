import { useState } from "react";
import DatePicker from "react-datepicker";
import CustomButton from "../layout/CustomButton";
import ProfilePicture from "../layout/ProfilePicture";
import "./SignUp.css";

const SignUpForm = ({ formData, handleChange, handleSubmit }) => {
  const [step, setStep] = useState(0);

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 1) return;
    setStep(step + 1);
  };

  const previousStep = (e) => {
    e.preventDefault();
    if (step === 0) return;
    setStep(step - 1);
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <FormUserInfo
              formData={formData}
              handleChange={handleChange}
              //   handleDatePicker={handleDatePicker}
            />
            <CustomButton text="Continue" OnClick={nextStep} type="button" />
          </>
        );
      case 1:
        return (
          <>
            <FormUserDetails formData={formData} handleChange={handleChange} />
            <div className="signUp-buttons">
              <CustomButton
                text="Previous"
                OnClick={previousStep}
                type="button"
              />
              <CustomButton text="Sign Up" OnClick={handleSubmit} />
            </div>
          </>
        );
      default:
        return;
    }
  };

  return (
    <form className="signUp-form">
      <ImagePicker formData={formData} handleChange={handleChange} />
      {handleSteps(step)}
      <p style={{ textAlign: "end" }}>{step + 1}</p>
    </form>
  );
};

const ImagePicker = ({ formData, handleChange }) => {
  return (
    <div className="signUp-imagePicker">
      <input
        type="file"
        name="profilePicUrl"
        id="image-picker"
        onChange={(e) => handleChange(e.target.name, e.target.files[0])}
      />
      {/* {formData.profilePic ? (
        <img src={formData.profilePic} alt="" className="signUp-imagePreview" />
      ) : (
        <span className="material-icons signUp-imagePreview">
          account_circle
        </span>
      )} */}
      <ProfilePicture src={formData.profilePicUrl} imgSize="5em" iconSize="5em" isClickable={false}/>
      <label htmlFor="image-picker" className="image-picker">
        Upload picture (optional)
      </label>
    </div>
  );
};

const FormUserDetails = ({ formData, handleChange }) => {
  return (
    <>
      <div className="form-group">
        <label className="signUp-label">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={formData.email}
        />
      </div>

      <div className="form-group">
        <label className="signUp-label">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={formData.password}
        />
      </div>
    </>
  );
};

const FormUserInfo = ({ formData, handleChange }) => {
  return (
    <>
      <div className="form-group">
        <label className="signUp-label">Full name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={formData.name}
        />
      </div>

      <div className="form-group">
        <div className="form-inline">
          <div>
            <label className="signUp-label">Date of Birth</label>
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={(date) => handleChange("dateOfBirth", date)}
            />
          </div>
          <div>
            <label className="signUp-label">Genre</label>
            <select
              value={formData.genre}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              name="genre"
            >
              <option defaultValue="">Select an option</option>
              <option defaultValue="Male">Male</option>
              <option defaultValue="Female">Female</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
