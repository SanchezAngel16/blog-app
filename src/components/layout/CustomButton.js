import "./CustomButton.css";

const CustomButton = ({ text, type, OnClick }) => {
  return (
    <button type={type} className="custom-btn" onClick={OnClick}>
      {text}
    </button>
  );
};

export default CustomButton;
