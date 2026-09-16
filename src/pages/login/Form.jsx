import Input from "../../components/shared-components/Input";
import Button from "../../components/shared-components/Button";

function Form({ handleLogin, handleChange, errors, loading, formData }) {
  return (
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
  );
}
export default Form;