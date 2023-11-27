import axios from "axios";
import logo from "./assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ authState, setAuthState }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    setAuthState(false);
    navigate("/login");
  };

  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="d-flex justify-content-between w-100 p-3 px-5">
        <a href="/" className="navbar-brand">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>Project Management System</div>
          </div>
        </a>
        {authState ? (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="btn btn-secondary" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
