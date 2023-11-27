import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useEffect } from "react";
import { verifyAuth } from "../utils/utilities";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth(navigate, false);
  }, [navigate]);

  return (
    <div className="justify-content-center align-items-center pt-2">
      <div className="w-50 mx-auto justify-content-center border rounded mt-5 p-5">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
