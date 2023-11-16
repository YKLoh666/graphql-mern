import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "" || confirmPassword === "") {
      return alert("Please fill in all the fields");
    } else if (password !== confirmPassword) {
      alert("Password does not match in both fields");
      return setConfirmPassword("");
    }
  };

  return (
    <>
      <h3 className="d-flex align-items-center gap-3 mb-5">
        <FaUserPlus />
        Register Form
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
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
        <div className="mb-5">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="form-control"
            autoComplete="off"
            value={confirmPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between my-4 align-items-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div>
            Registered?{" "}
            <Link to="/login" className="link-secondary">
              Login here
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
