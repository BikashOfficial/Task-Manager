# Task Manager Application

![Task Manager Banner](Frontend/public/header_img.png)

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

### Authentication Endpoints
\`\`\`http
POST /api/auth/register
Content-Type: application/json

{
    "name": "string",
    "email": "string",
    "password": "string",
    "profileImageUrl": "string?",
    "adminInviteToken": "string?"
}

Response: {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "token": "string"
}
\`\`\`

[Additional endpoint documentation follows similar format...]

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

<!-- ## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Project Lead: [Your Name]
- Frontend Developer: [Name]
- Backend Developer: [Name]
- UI/UX Designer: [Name]

## 📞 Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue
4. Contact: support@taskmanager.com -->

---
