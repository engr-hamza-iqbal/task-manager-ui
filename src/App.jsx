import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/shared-components/Header.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/index.jsx";
import Register from "./pages/register/index.jsx";
import TaskDetail from "./pages/tasks/TaskDetail.jsx";
import Tasks from "./pages/tasks/Tasks.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import "./App.css";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated 
    ? children 
    : <Navigate to="/login" replace />;
}

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/tasks" replace /> : <Register />} 
        />
        <Route 
          path="/login" 
          element={ isAuthenticated ? <Navigate to="/tasks" replace /> : <Login />} 
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:taskId"
          element={
            <ProtectedRoute>
              <TaskDetail />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;
