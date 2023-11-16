import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      return alert("Please fill in all the fields");
    }

    console.log(username, password);
  };

  return (
    <>
      <h3 className="d-flex align-items-center gap-3 mb-5">
        <FaUser />
        Login Form
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
