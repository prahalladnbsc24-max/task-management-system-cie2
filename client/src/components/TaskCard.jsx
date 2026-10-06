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

  // Check whether the task is overdue
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

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">

          <h5 className="card-title">
            {task.title}
          </h5>

          <p className="card-text">
            {task.description || "No description"}
          </p>

          <p className="mb-2">
            <strong>Priority:</strong>{" "}
            <span className="badge bg-warning text-dark">
              {task.priority}
            </span>
          </p>

          <p className="mb-2">
            <strong>Status:</strong>{" "}
            <span className="badge bg-secondary">
              {task.status}
            </span>
          </p>

          <p className="mb-2">
            <strong>Due Date:</strong>{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </p>

          {/* Overdue indicator */}
          {isOverdue() && (
            <div className="mb-3">
              <span className="badge bg-danger">
                OVERDUE
              </span>
            </div>
          )}

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() =>
                (window.location.href = `/edit-task/${task._id}`)
              }
            >
              Edit
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
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