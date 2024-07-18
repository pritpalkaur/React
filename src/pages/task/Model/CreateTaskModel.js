import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CreateModel.css';

const CreateTaskModel = ({ onTaskCreated, onCancel }) => {
    const { projectID } = useParams(); // Extract projectID from URL parameters
    const [taskName, setTaskName] = useState('');
    const [assigneeId, setAssigneeId] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState(2); // Default to 'Medium' value
    const [comments, setComments] = useState('');
    const [complexity, setComplexity] = useState(2); // Default to 'Medium' value
    const [assigneeNameList, setAssigneeNameList] = useState([]);

    const priorityOptions = [
        { value: 1, text: 'High' },
        { value: 2, text: 'Medium' },
        { value: 3, text: 'Low' }
    ];

    useEffect(() => {
        const fetchAssigneeNameList = async () => {
            try {
                const response = await axios.get('https://localhost:7169/api/projects/GetTeamMembers');
                setAssigneeNameList(response.data);
            } catch (error) {
                console.error('Error fetching assignee names:', error);
            }
        };
        fetchAssigneeNameList();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newTask = {
            projectID, // Include projectID in the request payload
            taskName,
            assigneeId,
            dueDate,
            priority,
            comments,
            complexity
        };

        console.log('Submitting task:', newTask);

        try {
            const response = await axios.post('https://localhost:7169/api/taskup/CreateTask', newTask);
            console.log('Task created successfully:', response.data);
            onTaskCreated();
        } catch (error) {
            console.error('Error creating task:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-body">
                    <h4>Create New Task</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="taskName">Task Name</label>
                            <input
                                type="text"
                                id="taskName"
                                className="form-control"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="assigneeId">Assignee</label>
                            <select
                                id="assigneeId"
                                className="form-control"
                                value={assigneeId}
                                onChange={(e) => setAssigneeId(e.target.value)}
                                required
                            >
                                <option value="">Select Assignee</option>
                                {assigneeNameList.map(option => (
                                    <option key={option.memberId} value={option.memberId}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <input
                                type="date"
                                id="dueDate"
                                className="form-control"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                className="form-control"
                                value={priority}
                                onChange={(e) => setPriority(parseInt(e.target.value))}
                                required
                            >
                                {priorityOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.text}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comments">Comments</label>
                            <input
                                type="text"
                                id="comments"
                                className="form-control"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="complexity">Complexity</label>
                            <select
                                id="complexity"
                                className="form-control"
                                value={complexity}
                                onChange={(e) => setComplexity(parseInt(e.target.value))}
                            >
                                {priorityOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.text}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success">Create</button>
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModel;
