import React, { useEffect } from 'react'
import DashBoardLayout from '../../components/layout/DashBoardLayout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import { LuFileSpreadsheet } from 'react-icons/lu'
import TaskStatusTabs from '../../components/TaskStatusTabs'
import TaskCard from '../../components/TaskCard'

const ManageTask = () => {

  const [allTasks, setAllTasks] = useState([])

  const [tabs, setTabs] = useState([])
  const [filterStatus, setFilterStatus] = useState("All")

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === 'All' ? "" : filterStatus
        },
      });

      setAllTasks(res.data?.tasks?.length > 0 ? res.data?.tasks : [])

      //Map statusSummary data with fixed labels and order
      const statusSummary = res.data?.statusSummary || {};

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "InProgress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.compltedTasks || 0 },
      ]

      setTabs(statusArray)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } })
  };

  const handleDownloadReport = async () => {

  }

  useEffect(() => {
    getAllTasks(filterStatus);
    return () => { };
  }, [filterStatus]);




  return (
    <DashBoardLayout activeMenu="Manage Tasks">
      <div className='my-5'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between'>
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-xl md:text-xl font-medium'>My Tasks</h2>
            <button
              className='flex lg:hidden download-btn'
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className='text-lg' />
              Download Report
            </button>
          </div>

          {tabs?.[0]?.count > 0 && (
            <div className='flex items-center gap-3'>
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />

              <button
                className='hidden lg:flex download-btn mr-2'
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className='text-lg' />
                Download Report
              </button>

            </div>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 pr-2'> 
          {allTasks?.map((item, idx) => (

            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              progress={item.progress}
              status={item.status}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((item) => item.profileimageurl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist = {item.todoChecklist || []}
              onClick={() => {
                handleClick(item)
              }}
            />

          ))}
        </div>
      </div>
    </DashBoardLayout>
  )
}

export default ManageTask