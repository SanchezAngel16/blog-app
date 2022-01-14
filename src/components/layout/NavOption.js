import "./NavOption.css";

const NavOption = ({ Icon }) => {
  return (
    <div className="nav-option">
      {Icon && <span className="material-icons">{Icon}</span>}
    </div>
  );
};

export default NavOption;
