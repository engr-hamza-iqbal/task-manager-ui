import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/shared-components/ErrorMessage.jsx";
import Notification from "../../components/shared-components/Notification.jsx";
import { login } from "../../services/auth/auth.service.js";
import Form from './Form.jsx';
import Header from "./Header.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(location.state?.notification || null);

  useEffect(() => {
    if (!notification) {
      return undefined;
    }

    const timeoutId = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(timeoutId);
  }, [notification]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    setApiError("");

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      const data = await login(formData);
      loginUser(data.token);
      setFormData({ email: "", password: "" });
      navigate("/tasks");
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          "Unable to login. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Notification
        message={notification?.message}
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      <main className="flex mt-4 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <Header />
        <div className="mb-4">
          <ErrorMessage>{apiError}</ErrorMessage>
        </div>
        <Form 
            handleLogin={handleLogin} 
            handleChange={handleChange} 
            errors={errors} 
            loading={loading} 
            formData={formData} 
        />
      </div>
      </main>
    </>
  );
}

export default Login;
