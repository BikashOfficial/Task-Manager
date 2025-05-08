import React, { useState } from 'react'
import DashBoardLayout from '../../components/layout/DashBoardLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { use } from 'react'
import { LuTrash2 } from 'react-icons/lu'
import { PRIORITY_DATA } from '../../utils/data'
import SelectUsers from '../../components/inputs/SelectUsers'
import TodoListInput from '../../components/inputs/TodoListInput'
import AddAttachmentsInput from '../../components/inputs/AddAttachmentsInput'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import toast from 'react-hot-toast'

const CreateTask = () => {

  const location = useLocation()
  const { taskId } = location.state || {}
  const navigate = useNavigate()

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    attachments: [],
    todoChecklist: [], // Provide default empty array
    assignedTo: [],
  })


  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("")

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }))
  }

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      attachments: [],
      todoChecklist: [], // Provide default empty array
      assignedTo: [],
    })
  }

  const createTask = async () => {
    setLoading(true)

    try {
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: item,
        complete: false,
      }))

      const res = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      })

      toast.success("Task Created SucessFully")
      if (res.status === 201) {
        clearData()
      }

    } catch (error) {
      console.error("Error while creating task:", error);
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async () => { }

  const handleSumbit = async () => {
    setError(null)

    if (!taskData.title.trim()) {
      setError("Please enter task title")
      return;
    }
    if (!taskData.description.trim()) {
      setError("Please enter task description")
      return;
    }

    if (!taskData.dueDate) {
      setError("Please select due date")
      return;
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any member")
      return;
    }

    if (taskData.todoChecklist?.length === 0) {
      setError("Add atleast one todo task")
    }

    if (taskId) {
      updateTask()
      return;
    }

    createTask()
  }

  const getTaskDetailsByID = async () => { }

  const deleteTask = async () => { }



  return (
    <DashBoardLayout activeMenu="Create Task">

      <div className='mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
          <div className='form-card col-span-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl md:text-xl font-medium'>
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 px-2 py-1 border-rose-100 hover:border-rose-300 cursor-pointer'
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className='text-base' /> Delete
                </button>
              )}
            </div>

            <div className='mt-4'>
              <label className='text-xs font-medium text-slate-600'>
                Task Title
              </label>

              <input type="text"
                placeholder='Enter task title'
                className='form-input'
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            <div className='mt-4'>
              <label className='text-xs font-medium text-slate-600'>
                Task Description
              </label>

              <textarea type="text"
                placeholder='Describe task'
                className='form-input'
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>

            <div className='grid grid-cols-12 gap-4 mt-2'>
              <div className='col-span-6 md:col-span-4'>
                <label className='text-xs font-medium text-slate-600 '> Priority</label>

                <select
                  className='form-input'
                  value={taskData.priority}
                  onChange={({ target }) => handleValueChange("priority", target.value)}
                >
                  <option defaultChecked value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className='col-span-6 md:col-span-4'>
                <label className='text-xs font-medium text-slate-600 '> Due Date</label>

                <input className='form-input' type="date" value={taskData.dueDate} onChange={({ target }) => handleValueChange("dueDate", target.value)} />
              </div>

              <div className='col-span-12 md:col-span-3'>
                <label className='text-xs font-medium text-slate-600 '> Assign To</label>

                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignedTo", value)
                  }}

                />
              </div>



            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'> TODO checklist</label>

              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) => handleValueChange('todoChecklist', value)}
              />
            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'> Add Attachments</label>

              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) => handleValueChange('attachments', value)}
              />
            </div>

            {error && (
              <p className='text-xs font-medium text-red-500 mt-5'>{error}</p>
            )}

            <div className='flex justify-end mt-7'>
              <button
                className='add-btn'
                onClick={handleSumbit}
              // disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>

          </div>
        </div>
        {console.log(taskData)}
      </div>

    </DashBoardLayout>
  )
}

export default CreateTask