import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tasks/${id}`
      );

      const task = response.data;

      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Medium",
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
        status: task.status || "Pending",
      });

      setError("");
    } catch (error) {
      console.error("Error fetching task:", error);
      setError("Failed to load task.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a task title.");
      setSuccess("");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        formData
      );

      setSuccess("Task updated successfully!");
      setError("");

      setTimeout(() => {
        navigate("/tasks");
      }, 1000);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task.");
      setSuccess("");
    }
  };

  if (loading) {
    return (
      <div className="container page-container">
        <div className="page-loading">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 mb-0">Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">

      {/* Header */}
      <div className="page-header add-page-header">
        <div>
          <p className="section-label">UPDATE TASK</p>

          <h1 className="page-title">
            Edit Your Task
          </h1>

          <p className="page-subtitle">
            Update the details and keep your task information current.
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-9">

          <div className="form-card shadow-sm">

            {/* Form Header */}
            <div className="form-card-top">
              <div className="form-icon">
                ✎
              </div>

              <div>
                <h3>Edit Task</h3>

                <p>
                  Modify the information below and save your changes.
                </p>
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Title */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Task Title
                </label>

                <input
                  type="text"
                  className="form-control stylish-input"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  className="form-control stylish-input"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add details about this task..."
                  rows="5"
                />
              </div>

              <div className="row g-4">

                {/* Priority */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Priority
                  </label>

                  <select
                    className="form-select stylish-input"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Due Date */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Due Date
                  </label>

                  <input
                    type="date"
                    className="form-control stylish-input"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>

                {/* Status */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Status
                  </label>

                  <select
                    className="form-select stylish-input"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

              </div>

              <div className="form-divider"></div>

              <div className="d-flex gap-3">

                <button
                  type="submit"
                  className="btn btn-primary btn-lg px-4 flex-grow-1"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="btn btn-light btn-lg px-4"
                  onClick={() => navigate("/tasks")}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>
      </div>

    </div>
  );
}

export default EditTask;