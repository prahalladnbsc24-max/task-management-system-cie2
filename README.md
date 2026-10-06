# Task Management System

A full-stack Task Management System developed using React.js, Node.js, Express.js, and MongoDB.

This project was developed as part of the **CS3301 – Full Stack Development CIE-2 Assignment**.

---

## Selected YouTube Tutorial

This project was developed by following and studying the following educational YouTube tutorial:

### Tutorial Details

**Tutorial Title:**  
Full Stack ToDo App with React, Node.js, Express & MongoDB Tutorial

**YouTube Channel:**  
webco programming

**Tutorial URL:**  
https://www.youtube.com/watch?v=2l_oHQLQQ2s

**Tutorial Type:**  
Full-stack Task Management / To-Do Application

---

## Project Overview

The Task Management System is a web application that helps users create, organize, update, track, and delete tasks.

Users can manage task details such as:

- Task title
- Description
- Priority
- Due date
- Status

The application also provides search and filtering functionality to help users quickly find tasks.

---

## Features

### Task Management
- Create new tasks
- View all tasks
- Edit existing tasks
- Delete tasks
- Track task status

### Task Priority
Each task can have one of three priority levels:

- Low
- Medium
- High

### Due Date Tracking
- Assign a due date to each task
- Display due dates
- Automatically identify overdue tasks
- Completed tasks are not marked as overdue

### Search and Filtering
- Search tasks by title or description
- Filter tasks by priority
- Filter tasks by status
- Clear all filters

### Dashboard
The home page displays:

- Total tasks
- Pending tasks
- In Progress tasks
- Completed tasks
- Overdue tasks

### Responsive Interface
The application is responsive and works across different screen sizes, including mobile screens.

---

## Technologies Used

### Frontend
- React.js
- React Router
- Axios
- Bootstrap
- CSS

### Backend
- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

### Database
- MongoDB Atlas

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Vite

---

## Project Structure

```text
Task-Management-System
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskStatistics.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── AddTask.jsx
│   │   │   ├── EditTask.jsx
│   │   │   └── About.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   ├── controllers
│   │   └── taskController.js
│   │
│   ├── models
│   │   └── Task.js
│   │
│   ├── routes
│   │   └── taskRoutes.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
