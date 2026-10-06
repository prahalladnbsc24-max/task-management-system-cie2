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

  // Fetch the selected task
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

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  // Update the task
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a task title.");
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
      <div className="container mt-5">
        <h2>Edit Task</h2>
        <p>Loading task...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <div className="card shadow-sm">
            <div className="card-body p-4">

              <h2 className="mb-4 text-center">
                Edit Task
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

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Update Task
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary w-100"
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
    </div>
  );
}

export default EditTask;