import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UpdateModel.css'; // Importing the CSS file for modals

function UProjectModal({ show, onClose, project, onUpdateSuccess }) {
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState(project.project_Name);
  const [projectDescription, setProjectDescription] = useState(project.project_Description);
  const [isActive, setIsActive] = useState(project.isActive);
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState(project.teamId);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('https://localhost:7169/api/Projects/GetTeams');
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError("Failed to load teams.");
      }
    };

    fetchTeams();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    const updatedProject = {
      projectId: project.projectId,
      project_Name: projectName,
      project_Description: projectDescription,
      isActive: isActive,
      teamId: teamId,
    };

    try {
      const response = await axios.put(`https://localhost:7169/api/Projects/UpdateProject/${project.projectId}`, updatedProject, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        onUpdateSuccess(response.data);
        onClose();
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (   
          <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
            <h1>this is testt</h1>
            <form onSubmit={handleUpdate}>
            <h4>Update Project</h4>
            {error && <p className="error-message">Error updating project: {error.message}</p>}
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                className="form-control"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Project Description</label>
              <textarea
                className="form-control"
                value={projectDescription}
                onChange={e => setProjectDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Is Active</label>
              <select
                className="form-control"
                value={isActive}
                onChange={e => setIsActive(e.target.value)}
                required
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="teamId">Team:</label>
              <select
                id="teamId"
                name="teamId"
                className="form-control"
                value={teamId}
                onChange={e => setTeamId(e.target.value)}
                required
              >
                {teams.map((team) => (
                  <option key={team.teamID} value={team.teamID}>
                    {team.team_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
            </div>
          </div>
        </div>
  );
}

export default UProjectModal;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './Modal.css'; // Importing the CSS file for modals

// const CreateProjectModal = ({ show, onClose, onCreateSuccess }) => {
//   const [loading, setLoading] = useState(false); // Initialize loading state
//   if (!show) return null; // Hide modal if not showing

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true); // Set loading state before starting the request
//     const formData = new FormData(event.target);
//     const newProject = {
//       project_Name: formData.get('project_Name'),
//       project_Description: formData.get('project_Description'),
//       isActive: "true",//formData.get('isActive') === "1"
//       teamId: formData.get('teamId'),
//     };

//     try {
//       const response = await axios.post('https://localhost:7169/api/Projects/CreateProject', newProject);
//       onCreateSuccess(response.data);
//       onClose(); // Close modal on success
//     } catch (error) {
//       console.error("Error creating project:", error);
//       alert(`Failed to create project: ${error?.response?.data?.message || 'An unexpected error occurred'}`);
//     } finally {
//       setLoading(false); // Reset loading state after request
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="modal-body">
//           <form onSubmit={handleSubmit}>
//             <h4>Create New Project</h4>
//             <div className="form-group">
//               <label htmlFor="project_Name">Project Name:</label>
//               <input
//                 type="text"
//                 id="project_Name"
//                 name="project_Name"
//                 required
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="project_Description">Project Description:</label>
//               <input
//                 type="text"
//                 id="project_Description"
//                 name="project_Description"
//                 required
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="isActive">Active:</label>
//               <select
//                 id="isActive"
//                 name="isActive"
//                 required
//                 className="form-control"
//               >
//                 <option value="true">Yes</option>
//                 <option value="fail">No</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="teamId">Team ID:</label>
//               <select
//                 id="teamId"
//                 name="teamId"
//                 required
//                 className="form-control"
//               >
//                 {/* Example team options */}
//                 <option value="1">Team 1</option>
//                 <option value="2">Team 2</option>
//                 <option value="3">Team 3</option>
//               </select>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-success" disabled={loading}>
//                 {loading ? "Creating..." : "Create"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateProjectModal;
