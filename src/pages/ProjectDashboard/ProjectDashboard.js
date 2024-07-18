import React from 'react';
import ProjectPieChart from './ProjectPieChart'
import UserInfo from '../user/UserInfo'; // Adjust the path as necessary
import ProjectTaskStatus from './ProjectTaskStatus';
import ComboChartComponent from './ComboChartComponent'; // Adjust the path as necessary
import GanttChartComponent from './GanttChartComponent'; // Adjust the path as necessary
import OrgChartComponent from './OrgChartComponent'; // Adjust the path as necessary
const ProjectDashboard = () => {
    return (
        <div className="container-fluid mt-5">   
        <div className="row">         
                    <div className="project-page">
                    <UserInfo memberId={UserInfo.memberId} />
                    </div>
                    </div>
        <div className="row">
                    <div className="col-md-4 mb-4">
                        <ProjectTaskStatus />
                    </div>
                    <div className="col-md-4 mb-4">
                        { <ProjectPieChart /> }
                    </div>
                    <div className="col-md-4 mb-4">
                          <OrgChartComponent /> 
                    
                    </div>
        </div>
        <div className="row">
                    <div className="col-md-7 mb-4">
                     <GanttChartComponent /> 
                    </div>                   
                    <div className="col-md-5 mb-4">
                     <ComboChartComponent /> 
                    </div>  
        </div>
        </div>
    );
};

export default ProjectDashboard;
