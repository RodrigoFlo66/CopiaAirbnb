import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import PasswordResetForm from "../components/PasswordResetForm/PasswordResetForm";

function PasswordRecovery() {
  const { user, loading,  } = useAuth();

  if(loading) return <LoadingPage />

  if(user) return <Navigate to={'/'}></Navigate> 

  return (
    <>
      <div className="background">
        <PasswordResetForm />
      </div>
    </>
  );
}

export default PasswordRecovery;
