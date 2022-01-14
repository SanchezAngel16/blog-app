const ProfilePicture = ({ src, imgSize, iconSize, isClickable, OnClick }) => {
  const imgStyles = {
    width: imgSize,
    height: imgSize,
    borderRadius: "50%",
    alignSelf: "center",
    margin: "0 10px"
  };

  let cursorType= "default";

  if(isClickable){
      cursorType = "pointer";
  }

  const iconStyles = {
      fontSize: iconSize,
      cursor: cursorType,
      margin: "0 10px"
  }

  return (
    <>
      {src ? (
        <img src={src} alt="" style={imgStyles} onClick={OnClick}/>
      ) : (
        <span className="material-icons" style={iconStyles} onClick={OnClick}>
          account_circle
        </span>
      )}
    </>
  );
};

export default ProfilePicture;
