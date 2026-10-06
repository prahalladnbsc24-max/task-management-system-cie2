import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== taskId)
    );
  };

  // Search + filter logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>My Tasks</h2>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Tasks</h2>

        <span className="badge bg-primary">
          {filteredTasks.length} Task
          {filteredTasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Search and Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <div className="row g-3">

            {/* Search */}
            <div className="col-md-5">
              <label className="form-label fw-bold">
                Search Tasks
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>

            {/* Priority Filter */}
            <div className="col-md-3">
              <label className="form-label fw-bold">
                Priority
              </label>

              <select
                className="form-select"
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
              >
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="col-md-3">
              <label className="form-label fw-bold">
                Status
              </label>

              <select
                className="form-select"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="col-md-1 d-flex align-items-end">
              <button
                className="btn btn-secondary w-100"
                onClick={() => {
                  setSearchTerm("");
                  setPriorityFilter("All");
                  setStatusFilter("All");
                }}
              >
                Clear
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* No matching tasks */}
      {filteredTasks.length === 0 ? (
        <div className="alert alert-info">
          No matching tasks found.
        </div>
      ) : (
        <div className="row">

          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onTaskDeleted={handleTaskDeleted}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default Tasks;