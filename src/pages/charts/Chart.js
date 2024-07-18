import React from 'react';
import TaskStatusBarGraph from './TaskStatusBarGraph';
import UserInfo from '../user/UserInfo'; // Adjust the path as necessary

const Chart = () => {
    return (

        <div>
            <div className="project-page">
            <UserInfo memberId={UserInfo.memberId} />
            </div>
            <TaskStatusBarGraph />
        </div>
    );
};

export default Chart;
