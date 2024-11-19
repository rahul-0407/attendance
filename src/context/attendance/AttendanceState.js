import { useState } from "react";
import attendanceContext from "./attendanceContext";

const AttendanceState = (props) => {

    const [alert, setAlert] = useState(null)

    const [Subject, setSubject] = useState(null)
    

  const showAlert = (type,message) => {
    setAlert({
      type:type,
      message:message,
    })
    setTimeout(() => {
      setAlert(null)
    }, 1300);
  }

  const attendanceInitial = [
    {
        "_id": "65cf5cb13ec60fba7083ffc2",
        "user": "65cf5cb13ec60fba7083ffc0",
        "Math": "not mention",
        "Html_and_CSS": "not mention",
        "GTP": "not mention",
        "HVE": "not mention",
        "EVS": "not mention",
        "c_programminig": "not mention",
        "Web_Dev": "not mention",
        "c_programminig_lab": "not mention",
        "science": "present",
        "createdAt": "2024-02-16T13:01:19.798Z",
        "__v": 0
    }
  ]

  const [attendance, setAttendance] = useState(attendanceInitial)

  const generateCode = async (Code) => {

    console.log(Subject)

    const response = await fetch(`http://localhost:5000/api/auth/generateCode`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({code:Code,subject:Subject}),
    });

    const result = await response.json();

    
  }

  const getAttendance = async () => {
    try {
      console.log("getAttendance")
      const response = await fetch('http://localhost:5000/api/auth/attendance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are included
      });

  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
      setAttendance(json);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      showAlert('danger', 'Error fetching attendance');
    }
  };
  

  const submitCode = async (otp) => {

    const response = await fetch(`http://localhost:5000/api/auth/submitCode`, {
      method: "PUT", 
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({code:otp}),
    });
  }

  
  return (
    <attendanceContext.Provider value={{alert,showAlert,setSubject,generateCode,submitCode,getAttendance,attendance,getAttendance}}>
      {props.children}
    </attendanceContext.Provider>
  )
}

export default AttendanceState
