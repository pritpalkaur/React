import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import CreateTaskModel from './Model/CreateTaskModel';
import UserInfo from '../user/UserInfo'; // Adjust the path as necessary

const Task = () => {
    const { projectID } = useParams(); 
    const [tasks, setTasks] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [formData, setFormData] = useState({});
    const [assigneeNameList, setAssigneeNameList] = useState([]);
    const [isCreatingTask, setIsCreatingTask] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7169/api/taskup/GetTasks/${projectID}`);
            const data = response.data;
            setTasks(data._completed);
            setAssigneeNameList(data.assigneeNameList);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (task) => {
        setEditRowId(task.taskId);
        setFormData({ ...task });
    };

    const handleSaveClick = async () => {
        try {
            await axios.post('https://localhost:7169/api/taskup/UpdateTask', formData);
            setTasks(tasks.map(task => task.taskId === formData.taskId ? formData : task));
            setEditRowId(null);
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleDeleteClick = async (taskId) => {
        try {
            await axios.post('https://localhost:7169/api/taskup/DeleteTask', { taskId });
            setTasks(tasks.filter(task => task.taskId !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCancelClick = () => {
        setEditRowId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const priorityOptions = ['High', 'Medium', 'Low'];

    return (
        <div className="container mt-5">
            <div className="project-page">
                <UserInfo memberId={UserInfo.memberId} />
            </div>
            <h4 className="mb-4">Project ID: {projectID}</h4>  {/* Display the project ID */}
            <Link to="/projects" className="btn btn-primary mb-4">Back</Link> {/* Back button */}
            <button
                className="btn btn-success mb-4 ml-2"
                onClick={() => setIsCreatingTask(true)}
            >
                Create Task
            </button>
            {isCreatingTask && (
                <CreateTaskModel
                    onTaskCreated={() => {
                        fetchData();
                        setIsCreatingTask(false);
                    }}
                    onCancel={() => setIsCreatingTask(false)}
                />
            )}
            <div className="table-container">
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Task Name</th>
                            <th>Assignee</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Comments</th>
                            <th>Complexity</th>
                            <th>Project ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            editRowId === task.taskId ? (
                                <tr key={task.taskId}>
                                    <td>
                                        <input
                                            type="text"
                                            name="taskName"
                                            value={formData.taskName}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="assigneeId"
                                            value={formData.assigneeId}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            {assigneeNameList.map(option => (
                                                <option key={option.value} value={option.value}>{option.text}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="dueDatetxt"
                                            value={formData.dueDatetxt}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="prioritytxt"
                                            value={formData.prioritytxt}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            {priorityOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{task.statustxt}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="comments"
                                            value={formData.comments}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="complexityTxt"
                                            value={formData.complexityTxt}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            {priorityOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        {task.projectId}
                                    </td>
                                    <td>
                                        <button onClick={handleSaveClick} className="btn btn-success btn-sm mr-2">Save</button>
                                        <button onClick={handleCancelClick} className="btn btn-secondary btn-sm">Cancel</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={task.taskId}>
                                    <td>{task.taskName}</td>
                                    <td>{task.assigneeName}</td>
                                    <td>{task.dueDatetxt}</td>
                                    <td>{task.prioritytxt}</td>
                                    <td>{task.statustxt}</td>
                                    <td>{task.comments}</td>
                                    <td>{task.complexityTxt}</td>
                                    <td>{task.projectId}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(task)} className="btn btn-primary btn-sm mr-2">Edit</button>
                                        <button onClick={() => handleDeleteClick(task.taskId)} className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Task;
