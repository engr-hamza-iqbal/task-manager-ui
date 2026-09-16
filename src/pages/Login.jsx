import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/shared-components/Button.jsx";
import ErrorMessage from "../components/shared-components/ErrorMessage.jsx";
import Input from "../components/shared-components/Input.jsx";
import Notification from "../components/shared-components/Notification.jsx";
import { login } from "../services/auth/auth.service.js";

function Login() {
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
      localStorage.setItem("token", data.token);
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
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>

          <p className="mt-1 text-sm text-gray-600">
            Sign in to your Task Manager account.
          </p>
        </div>

        <div className="mb-4">
          <ErrorMessage>{apiError}</ErrorMessage>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />

          <Button type="submit" loading={loading}>
            Login
          </Button>
        </form>
      </div>
      </main>
    </>
  );
}

export default Login;
