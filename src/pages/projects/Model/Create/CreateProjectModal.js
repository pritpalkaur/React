import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CreateModel.css'; // Importing the CSS file for modals

const CreateProjectModal = ({ show, onClose, onCreateSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('https://localhost:7169/api/projects/GetTeams');
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setFetchError("Failed to load teams.");
      }
    };

    fetchTeams();
  }, []);

  if (!show) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const newProject = {
      project_Name: formData.get('project_Name'),
      project_Description: formData.get('project_Description'),
      isActive: formData.get('isActive') === "true" ? "1" : "0",
      teamId: formData.get('teamId'),
    };

    try {
      const response = await axios.post('https://localhost:7169/api/Projects/CreateProject', newProject);
      onCreateSuccess(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
      alert(`Failed to create project: ${error?.response?.data?.message || 'An unexpected error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <h4>Create New Project</h4>
            <div className="form-group">
              <label htmlFor="project_Name">Project Name:</label>
              <input
                type="text"
                id="project_Name"
                name="project_Name"
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="project_Description">Project Description:</label>
              <input
                type="text"
                id="project_Description"
                name="project_Description"
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="isActive">Active:</label>
              <select
                id="isActive"
                name="isActive"
                required
                className="form-control"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="teamId">Team ID:</label>
              <select
                id="teamId"
                name="teamId"
                required
                className="form-control"
              >
                {teams.map(team => (
                  <option key={team.teamID} value={team.teamID}>{team.team_Name}</option>
                ))}
              </select>
            </div>
            {fetchError && <p className="text-danger">{fetchError}</p>}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;


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
