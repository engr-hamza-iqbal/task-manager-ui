import Input from "../../components/shared-components/Input.jsx";
import Textarea from "../../components/shared-components/Textarea.jsx";
import Button from "../../components/shared-components/Button.jsx";

function Form({ handleSubmit, saving, formData, handleChange, errors }) {
  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Prepare interview questions"
        error={errors.title}
      />
      <Textarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Add useful context"
      />
      <Button type="submit" loading={saving}>
        Create task
      </Button>
    </form>
  );
}

export default Form;