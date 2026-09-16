import Button from "../../components/shared-components/Button.jsx";
import ErrorMessage from "../../components/shared-components/ErrorMessage.jsx";
import Input from "../../components/shared-components/Input.jsx";

function Form({ handleRegister, handleChange, formData, errors, apiError, loading }) {
  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <ErrorMessage>{apiError}</ErrorMessage>
      <Input label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
      <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
      <Button type="submit" loading={loading}>Create account</Button>
    </form>
  );
}

export default Form;