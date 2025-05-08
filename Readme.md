# Task Manager Application

![Task Manager Banner](Frontend/public/image.png)

A comprehensive full-stack task management application built with React.js and Node.js. This application enables teams to efficiently organize tasks, track progress, and collaborate effectively with role-based access control.

## 🌟 Key Features

### Authentication & Authorization
- **Secure User Authentication**
  - JWT-based authentication system
  - Password encryption using bcrypt
  - Token-based session management
  - Secure HTTP-only cookies
  
- **Role-Based Access Control**
  - Admin role with full system access
  - Member role with limited permissions
  - Protected routes and API endpoints
  - Role-specific dashboards

### Dashboard & Analytics
- **Interactive Dashboard**
  - Real-time task statistics
  - Priority distribution charts
  - Status-based task filtering
  - Team performance metrics
  
- **Data Visualization**
  - Pie charts for task distribution
  - Bar charts for priority analysis
  - Progress tracking indicators
  - Timeline views for deadlines

### Task Management
- **Comprehensive Task Operations**
  - Create detailed task entries
  - Update task status and progress
  - Delete tasks (admin only)
  - Bulk operations support
  
- **Task Properties**
  - Priority levels (Low, Medium, High)
  - Status tracking (Pending, In Progress, Completed)
  - Due date management
  - Progress percentage calculation
  
- **Task Features**
  - File attachments support
  - Todo checklists
  - Multiple assignee selection
  - Task comments and history

### Team Collaboration
- **User Management**
  - Team member profiles
  - Role assignment
  - Activity tracking
  - Performance monitoring
  
- **Communication Tools**
  - Task comments
  - Team member mentions
  - Email notifications (planned)
  - Real-time updates

## 🛠️ Technical Architecture

### Frontend Architecture
```
Frontend/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Cards/              # Card components for displaying data
│   │   ├── Charts/             # Data visualization components
│   │   ├── inputs/             # Form input components
│   │   └── layout/             # Page layout components
│   │
│   ├── context/                # React Context providers
│   │   └── userContext.jsx     # Global user state management
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useUserAuth.jsx     # Authentication hook
│   │
│   ├── pages/                  # Page components
│   │   ├── Admin/             # Admin-specific pages
│   │   ├── Auth/              # Authentication pages
│   │   └── User/              # User-specific pages
│   │
│   ├── utils/                  # Utility functions
│   │   ├── apiPath.js         # API endpoint definitions
│   │   ├── axiosInstance.js   # Axios configuration
│   │   └── helper.js          # Helper functions
│   │
│   └── App.jsx                # Main application component
```

### Backend Architecture
```
Backend/
├── config/                    # Configuration files
│   └── db.js                 # Database configuration
│
├── controllers/              # Request handlers
│   ├── authController.js    # Authentication logic
│   ├── taskController.js    # Task management logic
│   └── userController.js    # User management logic
│
├── middlewares/             # Custom middleware
│   ├── authMiddleware.js   # Authentication middleware
│   └── uploadMiddleware.js # File upload middleware
│
├── models/                  # Database models
│   ├── Task.js            # Task schema
│   └── User.js            # User schema
│
├── routes/                  # API routes
│   ├── authRoutes.js      # Authentication routes
│   ├── taskRoutes.js      # Task management routes
│   └── userRoutes.js      # User management routes
│
└── server.js               # Entry point
```

## 🔌 API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication Endpoints

### Register User
```http
POST /auth/register

Request Body:
{
    "name": "string (required)",
    "email": "string (required)",
    "password": "string (required)",
    "profileImageUrl": "string (optional)",
    "adminInviteToken": "string (optional - required for admin registration)"
}

Response (201):
{
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "admin|member",
    "profileImageUrl": "string",
    "token": "JWT token"
}
```

### Login
```http
POST /auth/login

Request Body:
{
    "email": "string (required)",
    "password": "string (required)"
}

Response (201):
{
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "admin|member",
    "profileImageUrl": "string",
    "token": "JWT token"
}
```

### Get User Profile
```http
GET /auth/profile
Authorization: Bearer {token}

Response (200):
{
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "profileImageUrl": "string"
}
```

### Update User Profile
```http
PUT /auth/profile
Authorization: Bearer {token}

Request Body:
{
    "name": "string (optional)",
    "email": "string (optional)",
    "password": "string (optional)"
}

Response (200):
{
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "token": "JWT token"
}
```

### Upload Profile Image
```http
POST /auth/upload-image
Content-Type: multipart/form-data

Request Body:
- image: File (jpg, jpeg, png)

Response (200):
{
    "imageUrl": "string"
}
```

## Task Endpoints

### Get All Tasks
```http
GET /tasks
Authorization: Bearer {token}
Query Parameters:
- status: "Pending|InProgress|Completed" (optional)

Response (200):
{
    "tasks": [{
        "_id": "string",
        "title": "string",
        "description": "string",
        "priority": "Low|Medium|High",
        "status": "Pending|InProgress|Completed",
        "dueDate": "Date",
        "assignedTo": [{
            "_id": "string",
            "name": "string",
            "email": "string",
            "profileImageUrl": "string"
        }],
        "createdBy": "string",
        "attachments": ["string"],
        "todoChecklist": [{
            "text": "string",
            "completed": "boolean"
        }],
        "progress": "number",
        "completedTodoCount": "number"
    }],
    "statusSummary": {
        "all": "number",
        "pendingTasks": "number",
        "inProgressTasks": "number",
        "completedTasks": "number"
    }
}
```

### Create Task (Admin Only)
```http
POST /tasks
Authorization: Bearer {token}

Request Body:
{
    "title": "string (required)",
    "description": "string (required)",
    "priority": "Low|Medium|High (required)",
    "dueDate": "Date (required)",
    "assignedTo": ["userId"] (required),
    "attachments": ["string"] (optional),
    "todoChecklist": [{
        "text": "string",
        "completed": false
    }] (optional)
}

Response (201):
{
    "message": "Task created successfully",
    "task": {Task Object}
}
```

### Update Task Status
```http
PUT /tasks/:id/status
Authorization: Bearer {token}

Request Body:
{
    "status": "Pending|InProgress|Completed"
}

Response (200):
{
    "message": "Task status Updated",
    "task": {Task Object}
}
```

### Update Task Checklist
```http
PUT /tasks/:id/todo
Authorization: Bearer {token}

Request Body:
{
    "todoChecklist": [{
        "text": "string",
        "completed": "boolean"
    }]
}

Response (200):
{
    "message": "Task Checklist updated",
    "task": {Task Object}
}
```

### Get Dashboard Data
```http
GET /tasks/dashboard-data
Authorization: Bearer {token}

Response (200):
{
    "statistics": {
        "totalTasks": "number",
        "pendingTasks": "number",
        "completedTasks": "number",
        "overdueTasks": "number"
    },
    "charts": {
        "taskDistribution": {
            "Pending": "number",
            "InProgress": "number",
            "Completed": "number",
            "All": "number"
        },
        "taskPriorityLevels": {
            "Low": "number",
            "Medium": "number",
            "High": "number"
        }
    },
    "recentTasks": [Task Objects]
}
```

## User Management Endpoints

### Get All Users (Admin Only)
```http
GET /users
Authorization: Bearer {token}

Response (200):
[{
    "_id": "string",
    "name": "string",
    "email": "string",
    "profileImageUrl": "string",
    "role": "string",
    "pendingTasks": "number",
    "inProgressTasks": "number",
    "completedTasks": "number"
}]
```

### Get User by ID
```http
GET /users/:id
Authorization: Bearer {token}

Response (200):
{
    "_id": "string",
    "name": "string",
    "email": "string",
    "profileImageUrl": "string",
    "role": "string"
}
```

## Report Endpoints (Admin Only)

### Export Tasks Report
```http
GET /reports/export/tasks
Authorization: Bearer {token}

Response: Excel file with task details
```

### Export Users Report
```http
GET /reports/export/users
Authorization: Bearer {token}

Response: Excel file with user-task statistics
```

## Error Responses

All endpoints may return these error responses:

### 401 Unauthorized
```json
{
    "message": "Not authorized, no token found"
}
// or
{
    "message": "Token failed"
}
```

### 403 Forbidden
```json
{
    "message": "Access denied, admin only"
}
```

### 400 Bad Request
```json
{
    "message": "Error description"
}
```

### 500 Server Error
```json
{
    "message": "Server error",
    "error": "Error details"
}
```

## Authentication

All protected endpoints require the following header:
```http
Authorization: Bearer {jwt_token}
```

The JWT token is obtained from the login or register endpoints and should be included in all subsequent requests to protected endpoints.

## 💾 Database Schema

### User Model
```javascript
{
    name: String (required),
    email: String (required, unique),
    password: String (required),
    profileImageUrl: String,
    role: String (enum: ['admin', 'member'])
}
```

### Task Model
```javascript
{
    title: String (required),
    description: String,
    priority: String (enum: ['Low', 'Medium', 'High']),
    status: String (enum: ['Pending', 'InProgress', 'Completed']),
    dueDate: Date (required),
    assignedTo: [User ObjectId],
    createdBy: User ObjectId,
    attachments: [String],
    todoChecklist: [{
        text: String,
        completed: Boolean
    }],
    progress: Number
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd task-manager
   ```

2. **Install Dependencies**
   ```bash
   # Install Frontend Dependencies
   cd Frontend
   npm install

   # Install Backend Dependencies
   cd ../Backend
   npm install
   ```

3. **Configure Environment**
   
   Backend (.env):
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   ADMIN_INVITE_TOKEN=your_admin_registration_token
   ```

   Frontend (.env):
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. **Start Development Servers**
   ```bash
   # Start Backend Server
   cd Backend
   npm run dev

   # Start Frontend Development Server
   cd Frontend
   npm run dev
   ```

## 🎯 Component Features

### Dashboard Components
- **InfoCard**: Displays statistical information with icons
- **CustomPieChart**: Visualizes task distribution
- **CustomBarChart**: Shows priority-based analytics
- **TaskListTable**: Lists tasks with sorting and filtering

### Task Components
- **TaskCard**: Displays task information in card format
- **Progress**: Shows task completion progress
- **TodoListInput**: Manages task checklist items
- **SelectUsers**: Handles user assignment

### Layout Components
- **DashboardLayout**: Main application layout
- **AuthLayout**: Authentication pages layout
- **Navbar**: Navigation header
- **SideMenu**: Collapsible sidebar navigation

## 🔒 Security Features

1. **Authentication**
   - JWT token-based authentication
   - Password hashing with bcrypt
   - Protected routes with middleware
   - Token refresh mechanism

2. **Authorization**
   - Role-based access control
   - Route protection
   - API endpoint protection
   - Resource-level permissions

## 🔧 Configuration Options

### Backend Configuration
```javascript
{
    "port": 8000,
    "mongoOptions": {
        "useNewUrlParser": true,
        "useUnifiedTopology": true
    },
    "jwtExpiry": "7d",
    "uploadLimits": {
        "fileSize": 5242880 // 5MB
    }
}
```

### Frontend Configuration
```javascript
{
    "apiTimeout": 15000,
    "uploadLimits": {
        "maxFiles": 5,
        "allowedTypes": ["image/jpeg", "image/png", "application/pdf"]
    }
}
```

## 📝 Contributing Guidelines

1. **Fork and Clone**
   - Fork the repository
   - Clone your fork locally

2. **Branch**
   - Create a new branch for each feature
   - Use descriptive branch names (e.g., feature/add-email-notifications)

3. **Commit Guidelines**
   - Write clear commit messages
   - Reference issue numbers
   - Keep commits focused and atomic

4. **Code Style**
   - Follow ESLint configuration
   - Use Prettier for formatting
   - Write meaningful comments
   - Include JSDoc documentation

5. **Testing**
   - Write unit tests for new features
   - Ensure all tests pass
   - Include integration tests where necessary

6. **Pull Request Process**
   - Update documentation
   - Include screenshots for UI changes
   - Link related issues
   - Request review from maintainers

---
