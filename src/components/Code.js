import React,{useEffect, useContext,useState} from 'react'
import {useNavigate} from "react-router-dom";
import attendanceContext from "../context/attendance/attendanceContext";


const Code = () => {

  let navigate = useNavigate();

  const [code,setCode] = useState("")
  const [timer, setTimer] = useState(30)
  const [intervalId, setIntervalId] = useState(null)
  const [genC, setGenC] = useState("Generate")
  const [isDisabled, setIsDisabled] = useState(false); 



  useEffect(() => {
    if(localStorage.getItem('token')=== null){
      navigate("/")
    }
    else{
      navigate("/code")
    }
    
    // eslint-disable-next-line
  }, []);

  const handleChange = () => {
    
  }

  const context = useContext(attendanceContext);
    const { generateCode } = context;

  const generate = (e) => {

    e.preventDefault()
    
    const elements = '1234567890'
    let newCode = "";

    for(let i=1;i<=6;i++){
      newCode = newCode + Math.floor(Math.random(elements) * 10);
    }

    setCode(newCode)
    setTimer(30)
    setGenC("Regenrate")
    setIsDisabled(true);

    if(intervalId){
      clearInterval(intervalId)
    }

    const id = setInterval(() => {
      setTimer((prevTimer)=>{
        if(prevTimer===0){
          setGenC("Regenrate")
          setCode('')
          setIsDisabled(false);
          clearInterval(id)
        }
        return prevTimer > 0 ? prevTimer - 1 : 0;
      })
    }, 1000);

    setIntervalId(id)

    generateCode(newCode);
  }


  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <h2 className="text-center mb-4">GENERATED CODE</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">Code</label>
            <div className="input-group">
              <input type="number" className="form-control" id="otp" value={code} maxlength="6" onChange={handleChange} pattern="\d{6}" placeholder="code" required/>
            </div>
          </div>
          <div className="mb-3">
              <p className="text-center">Timer: {timer} seconds</p>
            </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={isDisabled} onClick={generate}>{genC}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Code
