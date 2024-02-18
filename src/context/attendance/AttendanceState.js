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
    
    const response = await fetch(`http://localhost:5000/api/auth/attendance`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      },
    });

    const json = await response.json();
    
    console.log(json)
    setAttendance(json)
    console.log(attendance)
  }

  const submitCode = async (otp) => {
    console.log("fetching....")

    const response = await fetch(`http://localhost:5000/api/auth/submitCode`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
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
