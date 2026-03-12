# SOP Management System

A full-stack web application to create, manage, and organize Standard Operating Procedures (SOPs).

## Tech Stack

Frontend
- React
- TailwindCSS
- Axios
- React Router

Backend
- FastAPI
- SQLAlchemy
- JWT Authentication

Database
- PostgreSQL / SQLite

## Features

- User Authentication (JWT)
- Create SOP
- View SOP
- Edit SOP
- Delete SOP
- Search SOP
- Pagination
- Protected Routes
- Skeleton Loading UI

## Installation

### Clone the repository

git clone https://github.com/yourusername/sop-management-system

cd sop-management-system

---

### Backend Setup

cd backend

pip install -r requirements.txt

uvicorn main:app --reload

---

### Frontend Setup

cd frontend

npm install

npm run dev

---

### Open in Browser

http://localhost:5173

## Future Improvements

- Role-based permissions
- File attachments
- SOP version history
- Export SOP as PDF
- Deployment to cloud
