import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const filteredTasks = tasks.filter((task) => {
    const title = task.title || "";
    const description = task.description || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setPriorityFilter("All");
    setStatusFilter("All");
  };

  if (loading) {
    return (
      <div className="container page-container">
        <div className="page-loading">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 mb-0">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <p className="section-label">MY WORKSPACE</p>

          <h1 className="page-title">
            My Tasks
          </h1>

          <p className="page-subtitle">
            Stay on top of your work and keep everything organized.
          </p>
        </div>

        <div className="task-count-box">
          <span className="task-count-number">
            {filteredTasks.length}
          </span>

          <span className="task-count-label">
            {filteredTasks.length === 1 ? "Task" : "Tasks"}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="filter-panel shadow-sm">
        <div className="row g-3 align-items-end">

          <div className="col-lg-5">
            <label className="form-label">
              Search Tasks
            </label>

            <div className="search-wrapper">
              <span className="search-icon">⌕</span>

              <input
                type="text"
                className="form-control search-input"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <label className="form-label">
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

          <div className="col-md-4 col-lg-3">
            <label className="form-label">
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
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="col-md-4 col-lg-1">
            <button
              className="btn btn-light filter-clear-btn w-100"
              onClick={clearFilters}
              type="button"
            >
              Clear
            </button>
          </div>

        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger mt-4">
          {error}
        </div>
      )}

      {/* Results Summary */}
      {filteredTasks.length > 0 && (
        <div className="results-summary">
          Showing <strong>{filteredTasks.length}</strong>{" "}
          {filteredTasks.length === 1 ? "task" : "tasks"}
        </div>
      )}

      {/* Tasks */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state shadow-sm">
          <div className="empty-state-icon">✓</div>

          <h3>No tasks found</h3>

          <p>
            Try changing your search or filters, or create a new task.
          </p>

          <a
            href="/add-task"
            className="btn btn-primary px-4"
          >
            + Create Task
          </a>
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