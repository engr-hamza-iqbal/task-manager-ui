import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/shared-components/Button.jsx";
import ConfirmDialog from "../../components/shared-components/ConfirmDialog.jsx";
import ErrorMessage from "../../components/shared-components/ErrorMessage.jsx";
import Input from "../../components/shared-components/Input.jsx";
import Loader from "../../components/shared-components/Loader.jsx";
import Textarea from "../../components/shared-components/Textarea.jsx";
import { deleteTask, getTask, updateTask } from "../../services/tasks/task.service.js";

function TaskDetail() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTask = async () => {
            try {
                const data = await getTask(taskId);
                const loadedTask = data.task || data;
                setTask(loadedTask);
                setFormData({ title: loadedTask.title, description: loadedTask.description || "" });
            } catch (requestError) {
                setError(requestError.response?.data?.message || "Unable to load task details.");
            } finally {
                setLoading(false);
            }
        };

        loadTask();
    }, [taskId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previousData) => ({ ...previousData, [name]: value }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (!formData.title.trim()) {
            setError("Title is required.");
            return;
        }

        setError("");
        setSaving(true);
        try {
            const data = await updateTask(taskId, {
                title: formData.title.trim(),
                description: formData.description.trim(),
            });
            setTask(data.task);
            setFormData({ title: data.task.title, description: data.task.description || "" });
            setEditing(false);
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to update task.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setError("");
        setDeleting(true);
        try {
            await deleteTask(taskId);
            navigate("/tasks", { state: { notification: { type: "success", message: "Task deleted successfully." } } });
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to delete task.");
            setDeleting(false);
            setConfirmDelete(false);
        }
    };

    if (loading) {
        return <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center text-blue-600"><Loader label="Loading task details..." /></div>;
    }

    if (!task) {
        return <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8"><ErrorMessage>{error}</ErrorMessage><Button type="button" fullWidth={false} variant="secondary" onClick={() => navigate("/tasks")}>Back to tasks</Button></main>;
    }

    return (
        <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <ConfirmDialog
                open={confirmDelete}
                title="Delete task?"
                message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
                confirmLabel="Delete task"
                loading={deleting}
                onCancel={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
            />
            <Button type="button" fullWidth={false} variant="ghost" className="mb-6 px-0" onClick={() => navigate("/tasks")}>Back to tasks</Button>
            <ErrorMessage>{error}</ErrorMessage>
            <section className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
                {editing ? (
                    <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                        <Input name="title" value={formData.title} onChange={handleChange} label="Title" />
                        <Textarea name="description" value={formData.description} onChange={handleChange} label="Description" rows={6} />
                        <div className="flex justify-end gap-3">
                            <Button type="button" fullWidth={false} variant="secondary" onClick={() => setEditing(false)} disabled={saving}>Cancel</Button>
                            <Button type="submit" fullWidth={false} loading={saving}>Save</Button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <h1 className={`text-2xl font-bold ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}>{task.title}</h1>
                            <div className="flex gap-3">
                                <Button type="button" fullWidth={false} variant="secondary" onClick={() => setEditing(true)}>Edit</Button>
                                <Button type="button" fullWidth={false} variant="danger" onClick={() => setConfirmDelete(true)}>Delete</Button>
                            </div>
                        </div>
                        <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-slate-600">{task.description || "No description provided."}</p>
                    </>
                )}
            </section>
        </main>
    );
}

export default TaskDetail;