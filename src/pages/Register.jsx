import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/shared-components/Button.jsx";
import ErrorMessage from "../components/shared-components/ErrorMessage.jsx";
import Input from "../components/shared-components/Input.jsx";
import { register } from "../services/auth/auth.service.js";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    setApiError("");

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      await register(formData);
      setFormData({ name: "", email: "", password: "" });
      navigate("/login", {
        state: {
          notification: {
            type: "success",
            message: "Account created successfully. You can now log in.",
          },
        },
      });
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          "Unable to register. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Email address"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <ErrorMessage>{apiError}</ErrorMessage>
          <Button type="submit" loading={loading}>
            Register
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Register;
