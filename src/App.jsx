import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/shared-components/Header.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Tasks from "./pages/Tasks.jsx";
import "./App.css";

function ProtectedRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
