const taskModel = require("../models/Task");

//GET /api/tasks/
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    let tasks;

    if (req.user.role === "admin") {
      tasks = await taskModel
        .find(filter)
        .populate("assignedTo", "name email profileImageUrl");
    } else {
      tasks = await taskModel
        .find({ ...filter, assignedTo: req.user._id })
        .populate("assignedTo", "name email profileImageUrl");
    }

    //add completed todoChecklist count to each task
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoChecklist.filter(
          (item) => item.completed
        ).length;
        return { ...task._doc, completedTodoCount: completedCount };
      })
    );

    //status summary counts
    const allTasks = await taskModel.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await taskModel.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });
    // Counts tasks with "Pending" status
    // For users: Only counts their pending tasks
    // For admin: Counts all pending tasks

    const inProgressTasks = await taskModel.countDocuments({
      ...filter,
      status: "InProgress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const compltedTasks = await taskModel.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    res.json({
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        compltedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//GET /api/tasks/:id
const getTasksById = async (req, res) => {
  try {
    const task = await taskModel
      .findById(req.params.id)
      .populate("assignedTo", "name email profileImageUrl");

    if (!task) {
      return res.status(404).json({ message: "Task are not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//POST /api/tasks/
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;

    // Validate required fields
    if (!title || !description || !priority || !dueDate || !assignedTo) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Validate assignedTo array
    if (!Array.isArray(assignedTo)) {
      return res.status(400).json({
        message: "AssignedTo must be an array of userIds",
      });
    }

    // Add await here
    const task = await taskModel.create({
      title,
      description,
      priority,
      dueDate,
      attachments,
      todoChecklist: todoChecklist || [], // Provide default empty array
      assignedTo,
      createdBy: req.user._id,
      status: "Pending", // Add default status
      progress: 0, // Add default progress
    });

    res.status(201).json({ 
      message: "Task created successfully", 
      task 
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found!" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;

    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "AssignTo must be a array of user IDS" });
      }

      task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = await taskModel.save();
    res.json({ message: "Task Updated Successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not Found" });

    await task.deleteOne();
    res.json({ message: "Task deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//PUT /api/tasks/:id/status
const updateTaskStatus = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not Found" });

    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (!isAssigned && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not Authorized" });
    }

    task.status = req.body.status || task.status;

    if (task.status === "completed") {
      task.todoChecklist.forEach((item) => (item.completed = true));
      task.progress = 100;
    }

    await task.save();

    res.json({ message: "Task status Updated", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//PUT /api/tasks/:id/todo
const updateTaskChecklist = async (req, res) => {
  try {
    const { todoChecklist } = req.body;

    const task = await taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not Found" });

    //if the task is not asssign to perticular member and if he is not admin then - unauthorized
    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update checklist" });
    }

    task.todoChecklist = todoChecklist; //replace with updated checklist

    //auto update bashed on checklist completion
    const completedCount = task.todoChecklist.filter(
      (item) => item.completed
    ).length;

    const totalItems = task.todoChecklist.length;

    task.progress =
      totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    if (task.progress === 100) {
      task.status = "Completed";
    } else if (task.progress > 0) {
      task.status = "InProgress";
    } else {
      task.status = "Pending";
    }

    await task.save();

    const updatedTasks = await taskModel
      .findById(req.params.id)
      .populate("assignedTo", "name email profileImageUrl");

    res.json({
      message: "Task Checklist updated",
      task: updatedTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/tasks/dashboard-data
const getDashboardData = async (req, res) => {
  try {
    const totalTasks = await taskModel.countDocuments();
    const pendingTasks = await taskModel.countDocuments({ status: "Pending" });
    const completedTasks = await taskModel.countDocuments({
      status: "Completed",
    });
    const overdueTasks = await taskModel.countDocuments({
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    //Ensure all possible statues are included
    const taskStatuses = ["Pending", "InProgress", "Completed"];
    const taskDistributionRaw = await taskModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Defines possible task statuses Uses MongoDB's aggregate to group and count tasks
    // $group groups all documents together
    // $sum: 1 counts one for each document

    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, ""); //Remove space for response keys
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});

    taskDistribution["All"] = totalTasks; //add total count to taskDistribution

    const taskPriorities = ["Low", "Medium", "High"];
    const taskPriorityLevelsRaw = await taskModel.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);
    
    console.log('Raw priority levels:', taskPriorityLevelsRaw); // Debug log
    
    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {}); // Add initial empty object here
    
    console.log('Processed priority levels:', taskPriorityLevels); // Debug log

    const recentTasks = await taskModel
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/tasks/user-dashboard-data
const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.user._id; //only fetch data for the logged-in userf

    //user specific tasks
    const totalTasks = await taskModel.countDocuments({ assignedTo: userId });
    const pendingTasks = await taskModel.countDocuments({
      assignedTo: userId,
      status: "Pending",
    });
    const completedTasks = await taskModel.countDocuments({
      assignedTo: userId,
      status: "Completed",
    });

    const overdueTasks = await taskModel.countDocuments({
      assignedTo: userId,
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    const taskStatuses = ["Pending", "InProgress", "Completed"];
    const taskDistributionRaw = await taskModel.aggregate([
      {
        $match: {
          assignedTo: userId,
        },
      },

      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, ""); //Remove space for response keys
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});

    taskDistribution["All"] = totalTasks; //add total count to taskDistribution

    const taskPriorities = ["Low", "Medium", "High"];
    const taskPriorityLevelsRaw = await taskModel.aggregate([
      {
        $match: {
          assignedTo: userId,
        },
      },

      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);
    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {}); // Add initial empty object here

    const recentTasks = await taskModel
      .find({ assignedTo: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
};
