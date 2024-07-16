import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import LoggedIn from "./pages/LoggedIn";
import LoggedOut from "./pages/LoggedOut";

export default function App() {
  const { isLoading, isAuthenticated } = useKindeAuth();

  if (isLoading) return <></>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for when the user is authenticated */}
        <Route
          path="/logged-in"
          element={isAuthenticated ? <LoggedIn /> : <Navigate to="/" />}
        />

        {/* Route for when the user is not authenticated */}
        <Route
          path="/"
          element={!isAuthenticated ? <LoggedOut /> : <Navigate to="/logged-in" />}
        />

        {/* Default route */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/logged-in" : "/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

// #5AE2D7 Main color (green)
// #FF99FF Secondary color (pink)
// linear-gradient(0deg, #3c3c3c, #00d5ff) Background gradient
// test