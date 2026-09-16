import Button from "../../components/shared-components/Button.jsx";
import Input from "../../components/shared-components/Input.jsx";

function Form({ handleLogin, handleChange, formData, errors, loading }) {
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
      <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
      <Button type="submit" loading={loading}>Login</Button>
    </form>
  );
}

export default Form;