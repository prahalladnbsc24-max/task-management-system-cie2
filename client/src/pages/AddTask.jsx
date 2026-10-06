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

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        formData
      );

      setSuccess("Task added successfully!");
      setError("");

      setTimeout(() => {
        navigate("/tasks");
      }, 1000);
    } catch (error) {
      console.error("Error adding task:", error);

      setError("Failed to add task.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <div className="card shadow-sm">
            <div className="card-body p-4">

              <h2 className="mb-4 text-center">
                Add New Task
              </h2>

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
                <div className="mb-3">
                  <label className="form-label">
                    Task Title
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    rows="4"
                  />
                </div>

                {/* Priority */}
                <div className="mb-3">
                  <label className="form-label">
                    Priority
                  </label>

                  <select
                    className="form-select"
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
                <div className="mb-3">
                  <label className="form-label">
                    Due Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>

                {/* Status */}
                <div className="mb-4">
                  <label className="form-label">
                    Status
                  </label>

                  <select
                    className="form-select"
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

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Add Task
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddTask;