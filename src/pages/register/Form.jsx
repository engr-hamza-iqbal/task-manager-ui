import Button from "../../components/shared-components/Button.jsx";
import ErrorMessage from "../../components/shared-components/ErrorMessage.jsx";
import Input from "../../components/shared-components/Input.jsx";

function Form({ handleRegister, handleChange, formData, errors, apiError, loading }) {
  return (
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
  );
}

export default Form;