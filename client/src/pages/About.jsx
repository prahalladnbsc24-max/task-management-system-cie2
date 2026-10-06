function About() {
  return (
    <div className="container page-container">

      {/* Header */}
      <div className="about-hero">
        <p className="section-label">ABOUT THE PROJECT</p>

        <h1 className="page-title">
          Built to make task management simpler.
        </h1>

        <p className="page-subtitle about-subtitle">
          A full-stack task management application built using
          modern React and backend technologies.
        </p>
      </div>

      {/* Project Overview */}
      <div className="row g-4 mb-5">

        <div className="col-lg-7">
          <div className="about-card shadow-sm h-100">
            <span className="about-card-label">
              PROJECT OVERVIEW
            </span>

            <h2>
              Organize. Track. Complete.
            </h2>

            <p>
              Task Management System is a full-stack web application
              designed to help users organize their work, manage
              priorities, track deadlines, and monitor task progress
              from a single interface.
            </p>

            <p className="mb-0">
              The application uses React.js on the frontend,
              Express.js and Node.js on the backend, and MongoDB
              for persistent data storage.
            </p>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="about-card highlight-card shadow-sm h-100">
            <span className="about-card-label">
              KEY FEATURES
            </span>

            <div className="feature-list">

              <div className="feature-item">
                <span>✓</span>
                Create and manage tasks
              </div>

              <div className="feature-item">
                <span>✓</span>
                Priority and status tracking
              </div>

              <div className="feature-item">
                <span>✓</span>
                Due dates and overdue detection
              </div>

              <div className="feature-item">
                <span>✓</span>
                Search and filtering
              </div>

              <div className="feature-item">
                <span>✓</span>
                Responsive interface
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Technologies */}
      <div className="about-section">
        <div className="section-heading">
          <p className="section-label">
            TECHNOLOGY STACK
          </p>

          <h2>
            Built with modern web technologies
          </h2>
        </div>

        <div className="row g-4">

          <div className="col-md-6 col-lg-3">
            <div className="tech-card shadow-sm">
              <div className="tech-number">01</div>
              <h4>React.js</h4>
              <p>
                Component-based frontend interface with hooks,
                props, routing and state management.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="tech-card shadow-sm">
              <div className="tech-number">02</div>
              <h4>Express.js</h4>
              <p>
                REST API backend for task creation, retrieval,
                updating and deletion.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="tech-card shadow-sm">
              <div className="tech-number">03</div>
              <h4>MongoDB</h4>
              <p>
                Database used to store task information
                persistently.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="tech-card shadow-sm">
              <div className="tech-number">04</div>
              <h4>Bootstrap</h4>
              <p>
                Responsive layout and reusable interface
                styling.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* React Concepts */}
      <div className="concept-panel shadow-sm mt-5">

        <div>
          <p className="section-label">
            REACT CONCEPTS
          </p>

          <h2>
            Concepts demonstrated in this project
          </h2>

          <p>
            The application demonstrates the React concepts
            required for the CIE-2 assignment.
          </p>
        </div>

        <div className="concept-tags">
          <span>Components</span>
          <span>Props</span>
          <span>useState</span>
          <span>useEffect</span>
          <span>Event Handling</span>
          <span>Forms</span>
          <span>React Router</span>
          <span>Class Component</span>
        </div>

      </div>

    </div>
  );
}

export default About;