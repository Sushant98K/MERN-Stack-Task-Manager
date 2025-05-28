import React, { useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }))
  }

  const clearData = () => {
    // Reset Form
    setTaskData({
      title: "",
      description: "",
      priority: "",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  }

  // Create Task
  const createTask = async () => { }
  
  // Update Task
  const updateTask = async () => { }
  
  const handleSubmit = async () => { }
  
  // Get Task info by id
  const getTaskDetailsByID = async () => { }
  
  // Delete Task
  cosnt deleteTask = async () => { }
  

  return <DashboardLayout activeMenu="Create Task">CreateTask</DashboardLayout>;
};

export default CreateTask;
