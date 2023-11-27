import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { verifyAuth } from "../utils/utilities";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    verifyAuth(navigate, false);
  }, [navigate]);

  return (
    <div className="justify-content-center align-items-center pt-3">
      <div className="w-50 mx-auto justify-content-center border rounded mt-5 p-5">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
