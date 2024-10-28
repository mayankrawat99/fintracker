import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser; // Check if the user is authenticated

  if (!user) {
    // If not authenticated, redirect to the landing page
    return <Navigate to="/" />;
  }

  // If authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;
