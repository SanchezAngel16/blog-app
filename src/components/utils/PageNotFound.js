import "./PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {

  return (
    <div className="pageNotFound-panel">
      <div className="pageNotFound-card">
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/">Go home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
