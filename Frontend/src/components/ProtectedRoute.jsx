import { Navigate } from "react-router-dom";   /* import navigate hook to navigate between pages */

function ProtectedRoute({children}) {
    const token = localStorage.getItem("token");   /* the token is collected from localstorage and assigned to token variable */

    if (!token) {
        return <Navigate to="/" replace />;        /* if token doesn't exists navigate to login page*/
    }

    return children;                            /* if token exists navigate to corresponding children page */
}

export default ProtectedRoute;