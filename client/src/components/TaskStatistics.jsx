import React, { Component } from "react";

class TaskStatistics extends Component {
  render() {
    const {
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      overdueTasks,
    } = this.props;

    return (
      <div className="row mt-5">

        {/* Total Tasks */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h2 className="fw-bold">
                {totalTasks}
              </h2>

              <p className="mb-0">
                Total Tasks
              </p>
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h2 className="fw-bold">
                {pendingTasks}
              </h2>

              <p className="mb-0">
                Pending Tasks
              </p>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h2 className="fw-bold">
                {inProgressTasks}
              </h2>

              <p className="mb-0">
                In Progress
              </p>
            </div>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h2 className="fw-bold">
                {completedTasks}
              </h2>

              <p className="mb-0">
                Completed Tasks
              </p>
            </div>
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h2 className="fw-bold">
                {overdueTasks}
              </h2>

              <p className="mb-0">
                Overdue Tasks
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default TaskStatistics;