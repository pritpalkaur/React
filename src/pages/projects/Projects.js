import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateProjectModal from './Model/Create/CreateProjectModal';
import ConfirmDeleteModal from './Model/Delete/ConfirmDeleteModal';
import ResponseDeleteModal from './Model/Delete/ResponseDeleteModal';
import UProjectModal from './Model/Update/UProjectModal';
import UserInfo from '../user/UserInfo'; // Adjust the path as necessary

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creatingProject, setCreatingProject] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);
  const [responseMessage, setResponseMessage] = useState({ title: '', body: '' });
  const [updatingProject, setUpdatingProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const id = 2; // Replace with your hard-coded ID
    axios.get(`https://localhost:7169/api/Projects/GetProjectsById/${id}`)
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleCreateSuccess = (newProject) => {
    setProjects([...projects, newProject]);
    setCreatingProject(false);
  };

  const handleDeleteProject = (projectId) => {
    axios.delete(`https://localhost:7169/api/Projects/DeleteProject/${projectId}`)
      .then(response => {
        setProjects(projects.filter(project => project.projectId !== projectId));
        setDeletingProject(null);
        setResponseMessage({ title: 'Success', body: response.data.message });
      })
      .catch(error => {
        setDeletingProject(null);  // Close the confirmation modal
        setResponseMessage({ title: 'Error', body: error.response.data.message });
      });
  };

  const handleUpdateSuccess = (updatedProject) => {
    // Update the project list with the updated project details
    setProjects(projects.map(project => 
      project.projectId === updatedProject.projectId ? updatedProject : project
    ));
    // Close the update modal on success
    setUpdatingProject(null);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearchClick = async () => {
    if (!searchQuery.trim()) {
      // If the search query is empty or contains only whitespace, don't make the API call
      const id = 2; // Replace with your hard-coded ID
      axios.get(`https://localhost:7169/api/Projects/GetProjectsById/${id}`)
        .then(response => {
          setProjects(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
      return;
    } 
    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7169/api/Projects/SearchProjects/${searchQuery}`);
      setProjects(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects: {error.message}</p>;

  return (
    <div className="container">
              <div className="project-page">
            <UserInfo memberId={UserInfo.memberId} />
        </div>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearchClick}>Search</button>
      </div>
      <button
        className="btn btn-success mb-4"
        onClick={() => setCreatingProject(true)}
      >
        Create Project
      </button>
      {creatingProject && (
        <CreateProjectModal
          show={creatingProject}
          onClose={() => setCreatingProject(false)}
          onCreateSuccess={handleCreateSuccess}
        />
      )}
     {updatingProject && (
        <UProjectModal
          show={!!updatingProject}
          onClose={() => setUpdatingProject(null)}
          project={updatingProject}
          onUpdateSuccess={handleUpdateSuccess} // This prop is used to update the project list on success
        />
      )} 
      {deletingProject && (
        <ConfirmDeleteModal
          show={!!deletingProject}
          onClose={() => setDeletingProject(null)}
          onConfirm={() => handleDeleteProject(deletingProject.projectId)}
          title="Confirm Deletion"
        >
          <p>Are you sure you want to delete the project "{deletingProject.project_Name}"?</p>
        </ConfirmDeleteModal>
      )}
      <ResponseDeleteModal
        show={!!responseMessage.title}
        onClose={() => setResponseMessage({ title: '', body: '' })}
        message={responseMessage}
      />
      <div className="row">
        {projects.map(project => (
          <div key={project.projectId} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
              <h5 className="card-title"><strong>Project Name:</strong> {project.projectId}</h5>
                <h5 className="card-title"><strong>Project Name:</strong> {project.project_Name}</h5>
                <p className="card-text"><strong>Project Description:</strong> {project.project_Description}</p>
                <p className="card-text"><strong>Team Name:</strong> {project.teamName}</p>
                <p className="card-text"><strong>Active:</strong> {project.isActive === '1' ? 'Yes' : 'No'}</p>
                <button className="btn btn-outline-primary btn-md mx-1" onClick={() => setUpdatingProject(project)}>Update</button>
                <Link to={`/task/${project.projectId}`} className="btn btn-outline-secondary btn-md mx-1">Task</Link>
                <Link to={`/ProjectDashboard/${project.projectId}`} className="btn btn-outline-success btn-md mx-1">Dashboard</Link>
                <button className="btn btn-outline-danger btn-md mx-1" onClick={() => setDeletingProject(project)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
