import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard.jsx";
import Button from "../components/shared-components/Button.jsx";
import ConfirmDialog from "../components/shared-components/ConfirmDialog.jsx";
import ErrorMessage from "../components/shared-components/ErrorMessage.jsx";
import Input from "../components/shared-components/Input.jsx";
import Loader from "../components/shared-components/Loader.jsx";
import Notification from "../components/shared-components/Notification.jsx";
import Textarea from "../components/shared-components/Textarea.jsx";
import {
    createTask,
    deleteTask,
    getTasks,
    updateTask,
} from "../services/tasks/task.service.js";

function Tasks() {
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [tasks, setTasks] = useState([]);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data.tasks || []);
            } catch (error) {
                setApiError(error.response?.data?.message || "Unable to load tasks.");
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previousData) => ({ ...previousData, [name]: value }));
        setErrors((previousErrors) => ({ ...previousErrors, [name]: "" }));
    };

    const validate = () => {
        const nextErrors = {};
        if (!formData.title.trim()) {
            nextErrors.title = "Title is required";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setApiError("");
        if (!validate()) return;

        try {
            setSaving(true);
            const data = await createTask({
                title: formData.title.trim(),
                description: formData.description.trim(),
            });
            setTasks((previousTasks) => [data.task, ...previousTasks]);
            setFormData({ title: "", description: "" });
            setNotification({ type: "success", message: "Task created successfully." });
        } catch (error) {
            setApiError(error.response?.data?.message || "Unable to create task.");
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (task) => {
        setApiError("");
        try {
            setUpdatingId(task.id);
            const data = await updateTask(task.id, { completed: !task.completed });
            setTasks((previousTasks) =>
                previousTasks.map((previousTask) =>
                    previousTask.id === task.id ? data.task : previousTask,
                ),
            );
        } catch (error) {
            setApiError(error.response?.data?.message || "Unable to update task.");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleUpdate = async (taskId, taskData) => {
        setApiError("");
        try {
            setUpdatingId(taskId);
            const data = await updateTask(taskId, taskData);
            setTasks((previousTasks) =>
                previousTasks.map((task) => (task.id === taskId ? data.task : task)),
            );
            setNotification({ type: "success", message: "Task updated successfully." });
            return true;
        } catch (error) {
            setApiError(error.response?.data?.message || "Unable to update task.");
            return false;
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async () => {
        if (!taskToDelete) return;

        setApiError("");
        try {
            setDeletingId(taskToDelete.id);
            await deleteTask(taskToDelete.id);
            setTasks((previousTasks) => previousTasks.filter((item) => item.id !== taskToDelete.id));
            setNotification({ type: "success", message: "Task deleted successfully." });
        } catch (error) {
            setApiError(error.response?.data?.message || "Unable to delete task.");
        } finally {
            setDeletingId(null);
            setTaskToDelete(null);
        }
    };

	return (
		<>
			<Notification
				message={notification?.message}
				type={notification?.type}
				onClose={() => setNotification(null)}
			/>
            <ConfirmDialog
                open={Boolean(taskToDelete)}
                title="Delete task?"
                message={taskToDelete ? `Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.` : ""}
                confirmLabel="Delete task"
                loading={deletingId === taskToDelete?.id}
                onCancel={() => setTaskToDelete(null)}
                onConfirm={handleDelete}
            />
			<main className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
				<div className="mb-8">
					<p className="text-sm font-medium text-blue-600">Workspace</p>
					<h1 className="mt-1 text-2xl font-bold text-slate-900">Your tasks</h1>
				</div>

				<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
					<section className="h-fit rounded-xl bg-white p-6 shadow-sm">
						<h2 className="text-lg font-semibold text-slate-900">Create a task</h2>
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
							<Button type="submit" loading={saving}>Create task</Button>
						</form>
					</section>

					<section>
						<ErrorMessage>{apiError}</ErrorMessage>
						{loading ? (
							<div className="flex justify-center rounded-xl bg-white p-10 text-blue-600">
								<Loader label="Loading tasks..." />
							</div>
						) : tasks.length === 0 ? (
							<div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
								<h2 className="text-lg font-semibold text-slate-800">No tasks yet</h2>
								<p className="mt-2 text-sm text-slate-500">Create your first task to get started.</p>
							</div>
						) : (
							<div className="flex flex-col gap-3">
								{tasks.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										onToggle={handleToggle}
                                        onUpdate={handleUpdate}
                                        onDelete={setTaskToDelete}
										updating={updatingId === task.id}
										deleting={deletingId === task.id}
									/>
								))}
							</div>
						)}
					</section>
				</div>
			</main>
		</>
	);
}

export default Tasks;
