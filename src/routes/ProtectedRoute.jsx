import React from 'react'
import { useAuth } from '../contexts/authContext'
import { Navigate } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage/LoadingPage';

function ProtectedRoute({children}) {

    const {user, loading} = useAuth();

    if(loading) return <LoadingPage />

    if(!user) return <Navigate to={'/iniciar-sesion'} />

    return <>{children}</>
}

export default ProtectedRoute