import axios from "axios";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { verifyAuth } from "../utils/utilities";

const LoginForm = ({ setAuthState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let failed;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return alert("Please fill in all the fields");
    }

    const result = await axios.post(
      "http://localhost:5000/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    failed = result.failed;

    if (!failed) {
      setEmail("");
      setPassword("");
      setAuthState(true);

      verifyAuth(navigate, false);
    }
  };

  return (
    <>
      <h3 className="d-flex align-items-center gap-3 mb-5">
        <FaUser />
        Login Form
      </h3>
      {failed && <p>Failed to login</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between my-4 align-items-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div>
            Haven't register?{" "}
            <Link to="/register" className="link-secondary">
              Register here
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
