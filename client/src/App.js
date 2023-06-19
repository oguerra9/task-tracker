import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import TaskDisplay from './pages/TaskDisplay';

function App() {
  return (
    <Router>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Routes>
          <Route 
            path="/" 
            element={<Login />}
          />
          <Route 
            path="/taskDisplay" 
            element={<TaskDisplay />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
