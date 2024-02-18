import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from './components/Alert';
import Login from "./components/Login";
import Code from "./components/Code";
import Navbar from './components/Navbar';
import Attendance from './components/Attendance';
import AttendanceState from './context/attendance/AttendanceState'

function App() {
  return (
    <>
      <AttendanceState>
      <Router>
          <Navbar />
          <Alert/>
          <div className="container">
          <Routes>
            <Route exact path="/code" element={<Code />} />
            <Route exact path="/attendance" element={<Attendance />} />
            <Route exact path="/" element={<Login />} />
          </Routes>
          </div>
        </Router>
      </AttendanceState>
    </>
  );
}

export default App;
