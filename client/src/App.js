import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import TaskDisplay from './pages/TaskDisplay';
import PageHeader from './components/PageHeader';

function App() {

  return (
    <Router>
      <div className="flex-column justify-center align-center min-100-vh">
        <PageHeader />
        <Routes>
          <Route 
            path="https://oguerra9.github.io/task-tracker/" 
            element={<Login />}
          />
          <Route 
            path="https://oguerra9.github.io/task-tracker/taskDisplay" 
            element={<TaskDisplay />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// function App() {

//   const [currPage, setCurrentPage] = useState('');

//   const handlePageChange = (page) => setCurrentPage(page);

//   const renderPage = () => {
//     if (currPage === 'taskDisplay') {
//       return <TaskDisplay handlePageChange={handlePageChange} />;
//     } else {
//       return <Login handlePageChange={handlePageChange} />
//     }
//   };

//   return (
//       <div className="flex-column justify-center align-center min-100-vh">
//         <PageHeader handlePageChange={handlePageChange}/>
//         {renderPage()}
//       </div>
//   );
// }

// export default App;
