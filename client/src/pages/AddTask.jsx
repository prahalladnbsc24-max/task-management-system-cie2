import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      await axios.post(
        "http://localhost:5000/api/tasks",
        formData
      );

      setSuccess("Task created successfully!");
      setError("");

      setTimeout(() => {
        navigate("/tasks");
      }, 1000);
    } catch (error) {
      console.error("Error adding task:", error);

      setError("Failed to create task.");
      setSuccess("");
    }
  };

  return (
    <div className="container page-container">

      {/* Header */}
      <div className="page-header add-page-header">
        <div>
          <p className="section-label">CREATE NEW</p>

          <h1 className="page-title">
            Add a New Task
          </h1>

          <p className="page-subtitle">
            Turn your plans into actionable tasks.
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-9">

          <div className="form-card shadow-sm">

            <div className="form-card-top">
              <div className="form-icon">
                +
              </div>

              <div>
                <h3>Create Task</h3>

                <p>
                  Fill in the details below to add a new task.
                </p>
              </div>
            </div>

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
                  placeholder="e.g. Complete React assignment"
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
                  placeholder="Add some details about this task..."
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
                    <option value="In Progress">
                      In Progress
                    </option>
                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>

              </div>

              <div className="form-divider"></div>

              <div className="d-flex gap-3">

                <button
                  type="submit"
                  className="btn btn-primary btn-lg px-4 flex-grow-1"
                >
                  Create Task
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

export default AddTask;