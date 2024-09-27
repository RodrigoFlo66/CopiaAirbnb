import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import "../components/LoginForm/LoginForm.css";
import { Navigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage/LoadingPage";

function LoginPage() {
  const { user, loading } = useAuth();
  const [formFlag, setFormFlag] = useState(true);

  const switchForm = () => {
    formFlag ? setFormFlag(false) : setFormFlag(true);
  };

  if(loading) return <LoadingPage />

  if(user) return <Navigate to={'/'}></Navigate> 

  return (
    <>
      <div className="background">
        {formFlag ? (
          <LoginForm formFlag={formFlag} switchForm={switchForm} />
        ) : (
          <RegisterForm formFlag={formFlag} switchForm={switchForm} />
        )}
      </div>
    </>
  );
}

export default LoginPage;
