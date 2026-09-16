import Input from "../../components/shared-components/Input.jsx";
import Button from "../../components/shared-components/Button.jsx";
import Textarea from "../../components/shared-components/Textarea.jsx";

function Form({ handleSubmit, formData, handleChange, updating, setEditing  }) {
    return (
        <form onSubmit={handleSubmit} className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3">
                <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    label="Title"
                />
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    label="Description"
                    rows={3}
                />
                <div className="flex justify-end gap-3 text-sm">
                    <Button type="button" fullWidth={false} variant="ghost" className="px-3" onClick={() => setEditing(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" fullWidth={false} loading={updating} className="px-3">
                        Save
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Form;