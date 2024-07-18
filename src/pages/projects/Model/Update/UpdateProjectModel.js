import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateModel.css'; // Importing the CSS file for modals

function UpdateProjectModal({ show, onClose, project, onUpdateSuccess }) {
  // const [loading, setLoading] = useState(false);
  // const [projectName, setProjectName] = useState(project.project_Name);
  // const [projectDescription, setProjectDescription] = useState(project.project_Description);
  // const [isActive, setIsActive] = useState(project.isActive);
  // const [teams, setTeams] = useState([]);
  // const [teamId, setTeamId] = useState(project.teamId);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchTeams = async () => {
  //     try {
  //       const response = await axios.get('https://localhost:7169/api/Projects/GetTeams');
  //       setTeams(response.data);
  //     } catch (error) {
  //       console.error("Error fetching teams:", error);
  //       setError("Failed to load teams.");
  //     }
  //   };

  //   fetchTeams();
  // }, []);

  // const handleUpdate = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   const updatedProject = {
  //     projectId: project.projectId,
  //     project_Name: projectName,
  //     project_Description: projectDescription,
  //     isActive: isActive,
  //     teamId: teamId,
  //   };

  //   try {
  //     const response = await axios.put(`https://localhost:7169/api/Projects/UpdateProject/${project.projectId}`, updatedProject, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (response.status === 200) {
  //       onUpdateSuccess(response.data);
  //       onClose();
  //     } else {
  //       throw new Error(`Request failed with status code ${response.status}`);
  //     }
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // if (!show) return null;

  return (
   <h1>this is testt</h1>
  );
}

export default UpdateProjectModal;
