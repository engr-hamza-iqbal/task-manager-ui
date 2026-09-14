import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import "./App.css";

function App() {
  

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
