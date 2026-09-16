import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TaskCard from "../../components/TaskCard.jsx";
import Button from "../../components/shared-components/Button.jsx";
import ErrorMessage from "../../components/shared-components/ErrorMessage.jsx";
import Input from "../../components/shared-components/Input.jsx";
import Loader from "../../components/shared-components/Loader.jsx";
import Notification from "../../components/shared-components/Notification.jsx";
import Textarea from "../../components/shared-components/Textarea.jsx";
import {
  createTask,
  getTasks,
  updateTask,
} from "../../services/tasks/task.service.js";

function Tasks() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(
    location.state?.notification || null,
  );

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

  useEffect(() => {
    if (!notification) return undefined;
    const timeoutId = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(timeoutId);
  }, [notification]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
    setErrors((previousErrors) => ({ ...previousErrors, [name]: "" }));
  };

  const handleSubmit = async (event, closeAfterSubmit = false) => {
    event.preventDefault();
    setApiError("");
    const nextErrors = formData.title.trim()
      ? {}
      : { title: "Title is required" };
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setSaving(true);
      const data = await createTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
      setTasks((previousTasks) => [data.task, ...previousTasks]);
      setFormData({ title: "", description: "" });
      setNotification({
        type: "success",
        message: "Task created successfully.",
      });
      if (closeAfterSubmit) setAddModalOpen(false);
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
        previousTasks.map((item) => (item.id === task.id ? data.task : item)),
      );
    } catch (error) {
      setApiError(error.response?.data?.message || "Unable to update task.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <Notification
        message={notification?.message}
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      {addModalOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget &&
            !saving &&
            setAddModalOpen(false)
          }
        >
          <section
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-task-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-600">Workspace</p>
                <h2
                  id="add-task-title"
                  className="mt-1 text-xl font-semibold text-slate-900"
                >
                  Add a task
                </h2>
              </div>
              <Button
                type="button"
                fullWidth={false}
                variant="ghost"
                className="px-2 text-xl leading-none"
                onClick={() => setAddModalOpen(false)}
                disabled={saving}
                aria-label="Close add task form"
              >
                &times;
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                label="Title"
                placeholder="Prepare interview questions"
                error={errors.title}
              />
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                label="Description"
                placeholder="Add useful context"
                rows={4}
              />
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  fullWidth={false}
                  variant="secondary"
                  onClick={() => setAddModalOpen(false)}
                  disabled={saving}
                >
                  Close
                </Button>
                <Button type="submit" fullWidth={false} loading={saving}>
                  Add
                </Button>
                <Button
                  type="button"
                  fullWidth={false}
                  loading={saving}
                  onClick={(event) => handleSubmit(event, true)}
                >
                  Add and close
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">Workspace</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Your tasks
            </h1>
          </div>
          <Button
            type="button"
            fullWidth={false}
            onClick={() => setAddModalOpen(true)}
          >
            Add task
          </Button>
        </div>
        <section>
          <ErrorMessage>{apiError}</ErrorMessage>
          {loading ? (
            <div className="flex justify-center rounded-xl bg-white p-10 text-blue-600">
              <Loader label="Loading tasks..." />
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <h2 className="text-lg font-semibold text-slate-800">
                No tasks yet
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Create your first task to get started.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onShowMore={() => navigate(`/tasks/${task.id}`)}
                  updating={updatingId === task.id}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Tasks;
