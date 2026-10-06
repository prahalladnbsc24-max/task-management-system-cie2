import { useEffect, useState } from "react";
import axios from "axios";

import TaskStatistics from "../components/TaskStatistics";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate || task.status === "Completed") {
      return false;
    }

    const dueDate = new Date(task.dueDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  }).length;

  return (
    <div className="container mt-5">

      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="display-4 fw-bold">
          Task Management System
        </h1>

        <p className="lead">
          Organize your tasks, track deadlines, and manage priorities.
        </p>
      </div>

      {/* Statistics */}
      {loading ? (
        <div className="text-center mt-5">
          <p>Loading task statistics...</p>
        </div>
      ) : (
        <TaskStatistics
          totalTasks={totalTasks}
          pendingTasks={pendingTasks}
          inProgressTasks={inProgressTasks}
          completedTasks={completedTasks}
          overdueTasks={overdueTasks}
        />
      )}

    </div>
  );
}

export default Home;