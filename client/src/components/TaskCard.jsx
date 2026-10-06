import axios from "axios";

function TaskCard({ task, onTaskDeleted }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${task._id}`
      );

      onTaskDeleted(task._id);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const isOverdue = () => {
    if (!task.dueDate || task.status === "Completed") {
      return false;
    }

    const dueDate = new Date(task.dueDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  };

  const getPriorityClass = () => {
    switch (task.priority) {
      case "High":
        return "bg-danger";
      case "Medium":
        return "bg-warning text-dark";
      case "Low":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getStatusClass = () => {
    switch (task.status) {
      case "Completed":
        return "bg-success";
      case "In Progress":
        return "bg-primary";
      case "Pending":
        return "bg-secondary";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card task-card shadow-sm h-100">

        <div className="card-body d-flex flex-column">

          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold mb-0">
              {task.title}
            </h5>

            {isOverdue() && (
              <span className="badge bg-danger ms-2">
                OVERDUE
              </span>
            )}
          </div>

          <p className="card-text text-muted">
            {task.description || "No description"}
          </p>

          <div className="mb-2">
            <strong>Priority:</strong>{" "}
            <span className={`badge ${getPriorityClass()}`}>
              {task.priority}
            </span>
          </div>

          <div className="mb-2">
            <strong>Status:</strong>{" "}
            <span className={`badge ${getStatusClass()}`}>
              {task.status}
            </span>
          </div>

          <div className="mb-3">
            <strong>Due Date:</strong>{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </div>

          <div className="mt-auto d-flex gap-2">

            <button
              className="btn btn-outline-primary btn-sm flex-fill"
              onClick={() =>
                (window.location.href = `/edit-task/${task._id}`)
              }
            >
              Edit
            </button>

            <button
              className="btn btn-outline-danger btn-sm flex-fill"
              onClick={handleDelete}
            >
              Delete
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default TaskCard;