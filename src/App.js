// src/App.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/projects/Projects';
import Task from './pages/task/Task';
import ProjectDashboard from './pages/ProjectDashboard/ProjectDashboard';
import Chart from './pages/charts/Chart';
import Teams from './pages/Teams';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="container-fluid">
            <div className="row">
              <main className="col-md-12">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<ProtectedRoute element={Projects} />} />
                  <Route path="/projects/:projectID" element={<ProtectedRoute element={Projects} />} />
                  <Route path="/task/:projectID" element={<ProtectedRoute element={Task} />} />
                  <Route path="/ProjectDashboard/:projectID" element={<ProtectedRoute element={ProjectDashboard} />} />
                  <Route path="/charts/chart" element={<ProtectedRoute element={Chart} />} />
                  <Route path="/teams" element={<ProtectedRoute element={Teams} />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;





// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Home from './pages/Home';
// import Projects from './pages/projects/Projects'
// import Task from './pages/task/Task'; // Ensure correct import path
// import ProjectDashboard from './pages/ProjectDashboard/ProjectDashboard';
// import Chart from './pages/charts/Chart';
// import Teams from './pages/Teams';
// import './App.css';
// import './styles.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <div className="container-fluid">
//           <div className="row">
//             {/* Uncomment or add Sidebar component if needed */}
//             {/* <Sidebar /> */}
//             <main className="col-md-12 ">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/projects" element={<Projects />} />
//                 <Route path="/projects/:projectID" element={<Projects />} />
//                 <Route path="/task/:projectID" element={<Task />} />
//                 <Route path="/ProjectDashboard/:projectID" element={<ProjectDashboard />} />
//                 <Route path="/charts/chart" element={<Chart />} />
//                 <Route path="/teams" element={<Teams />} />
//               </Routes>
//             </main>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
