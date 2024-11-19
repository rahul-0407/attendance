import React,{useEffect,useContext,useState} from 'react'
import AttendanceList from './attendanceList'
import {useNavigate} from "react-router-dom";
import attendanceContext from "../context/attendance/attendanceContext";

const Attendance = () => {

  let navigate = useNavigate()

  const context = useContext(attendanceContext);
  const { submitCode,attendance,getAttendance } = context;

  const [Code, setCode] = useState("")

  useEffect(() => {
    
    getAttendance()
    
    // eslint-disable-next-line
  }, []);
  

  const handleChange = (event) => {
    setCode(event.target.value)
    // console.log(Code)
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    submitCode(Code)
  }

  return (
    <div className='container'>
      <div className='container'>
      <form>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">Code</label>
            <div className="input-group">
              <input type="number" className="form-control" id="otp"  maxlength="6"  pattern="\d{6}" placeholder="code" onChange={handleChange} value={Code} required/>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>Suject</th>
            {Array.from({length: 30}, (_,i) => (
              <th key={i + 1}>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        <AttendanceList index="1" title="Math" status={attendance[0].Math}/>
        <AttendanceList index="2" title="Html_and_CSS" status={attendance[0].Html_and_CSS}/>
        <AttendanceList index="4" title="GTP" status={attendance[0].GTP}/>
        <AttendanceList index="5" title="HVE" status={attendance[0].HVE}/>
        <AttendanceList index="6" title="EVS" status={attendance[0].EVS}/>
        <AttendanceList index="7" title="c_programminig" status={attendance[0].c_programminig}/>
        <AttendanceList index="8" title="Web_Dev" status={attendance[0].Web_Dev}/>
        <AttendanceList index="9" title="c_programminig_lab" status={attendance[0].c_programminig_lab}/>
        <AttendanceList index="10" title="science" status={attendance[0].science}/>
        </tbody>
      </table>
    </div>
  )
}

export default Attendance
