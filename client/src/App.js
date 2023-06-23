import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import TaskDisplay from './pages/TaskDisplay';
import PageHeader from './components/PageHeader';

function App() {

  const [currPage, setCurrentPage] = useState('');

  useEffect(() => {
    if (localStorage.hasOwnProperty('username')) {
      setCurrentPage('taskDisplay');
    } else {
      setCurrentPage('login');
    }

  }, []);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (currPage === 'taskDisplay') {
      return <TaskDisplay handlePageChange={handlePageChange} />;
    } else {
      return <Login handlePageChange={handlePageChange} />
    }
  };


  return (
      <div className="flex-column justify-center align-center min-100-vh">
        <PageHeader handlePageChange={handlePageChange} />
        {renderPage()}
      </div>
  );
}

export default App;
