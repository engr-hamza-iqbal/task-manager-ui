import { useState } from "react";
import Button from "../components/shared-components/Button.jsx";
import Input from "../components/shared-components/Input.jsx";
import { login } from "../services/auth/auth.service.js";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

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
      console.log("Login successful:", data);
      setFormData({ email: "", password: "" });
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
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>

          <p className="mt-1 text-sm text-gray-600">
            Sign in to your Task Manager account.
          </p>
        </div>

        {apiError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {apiError}
          </div>
        )}

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
  );
}

export default Login;
