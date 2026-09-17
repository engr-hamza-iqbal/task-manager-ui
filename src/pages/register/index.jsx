import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth/auth.service.js";
import { useAuth } from "../../context/AuthContext.jsx";
import Form from './Form.jsx';

function Register() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
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
      const data = await register(formData);
      sessionStorage.setItem(
        "registrationNotification",
        JSON.stringify({
          type: "success",
          message: "Account created successfully. Welcome!",
        }),
      );
      loginUser(data.token);
      setFormData({ name: "", email: "", password: "" });
      navigate("/tasks");
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
    <main className="flex min-h-[calc(100vh-280px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <Form 
            handleRegister={handleRegister}
            handleChange={handleChange}
            formData={formData}
            errors={errors}
            apiError={apiError}
            loading={loading}
        />
      </div>
    </main>
  );
}

export default Register;
