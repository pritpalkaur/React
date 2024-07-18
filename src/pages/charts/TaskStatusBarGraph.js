import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';

// Registering Chart.js components globally
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const TaskStatusBarGraph = ({ data }) => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (data) {
            const labels = data.map(d => d.statusName);
            const counts = data.map(d => d.count);
            setChartData({
                labels,
                datasets: [{
                    label: 'Task Count',
                    data: counts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        // Add more colors if needed
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        // Add more colors if needed
                    ],
                    borderWidth: 1
                }]
            });
        }
    }, [data]);

    return (
        <div>
            {chartData && <Bar
                ref={chartRef}
                data={chartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Task Status for all projects'
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />}
        </div>
    );
};

const TaskStatusBarGraphs = () => {
    const [chartData, setChartData] = useState(null);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('https://localhost:7169/api/graph/GetChartData/1');
                setChartData(response.data);
                setTasks(response.data.taskTbleData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchChartData();
    }, []);
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                {chartData && (
                    <>                      
                        <div className="container-fluid mt-5">
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <TaskStatusBarGraph data={chartData.barChart} />
                                </div>
                                <div className="col-md-4 mb-4">
                                    <TaskStatusBarGraph />
                                </div>
                                <div className="col-md-4 mb-4">
                                    <TaskStatusBarGraph />
                                </div>
                            </div>
                            <div className='row'>
                            <div className="col-md-12 mb-4" id="usertable">
                            <p></p>
                            <hr></hr>
                            <div className="table-responsive-md">
                        <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Task ID</th>
                                <th>Task Name</th>
                                <th>Assignee Name</th>
                                <th>Due Date</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Comments</th>
                                <th>Complexity</th>
                                <th>Completed Date</th>
                                <th>Project ID</th>
                                <th>classs name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                 <tr key={task.TaskId} className={task.rowClsName}>
                                    <td>{task.taskId}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.assigneeName}</td>
                                    <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</td>
                                    <td>{task.prioritytxt}</td>
                                    <td>{task.statustxt}</td>
                                    <td>{task.comments}</td>
                                    <td>{task.complexityTxt}</td>
                                    <td>{task.completedDate ? new Date(task.completedDate).toLocaleDateString() : ''}</td>
                                    <td>{task.projectName}</td>
                                    <td>{task.rowClsName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                                </div>
                                {/* <div className="col-md-4 mb-4">
                                    <TaskStatusBarGraph />
                                </div> */}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskStatusBarGraphs;

// const TaskStatusBarGraphs = () => {
//     return (
//         <div className="container-fluid mt-5">
//             <div className="row">
//                 <div className="col-md-4 mb-4">
//                     <TaskStatusBarGraph />
//                 </div>
//                 <div className="col-md-4 mb-4">
//                     <TaskStatusBarGraph />
//                 </div>
//                 <div className="col-md-4 mb-4">
//                     <TaskStatusBarGraph />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TaskStatusBarGraphs;
