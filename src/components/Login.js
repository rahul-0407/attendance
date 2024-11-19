import React,{useState,useContext} from "react";
import {useNavigate} from "react-router-dom";
import attendanceContext from "../context/attendance/attendanceContext";

const Login = () => {
    const context = useContext(attendanceContext);
    const { showAlert,setSubject } = context;


  const [credentials, setCredentials] = useState({email:"",password:""});
  const [loading, setLoading] = useState(false); // Add loading state for better UX
  const [error, setError] = useState(null); // Add error state for displaying errors
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      showAlert("danger", "Please enter both email and password");
      return;
    }

    setLoading(true)
    setError(null)

    try {
      
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password}),
      credentials:"include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    const { userType, authToken, success, subject } = data;

    if(subject){
      setSubject(subject)
    }


    if(success){
      // localStorage.setItem('token',authToken);
      
      if(userType==="teacher"){
        navigate("/code")
        showAlert("success","Login successfully!")
      }
      else if(userType==="student"){
        navigate("/attendance")
        showAlert("success","Login successfully!")
      }
      else{
        showAlert("danger","Invalid User-Type")
      }
    }
    else{
      showAlert("danger","Invalid Credentials")
    }


    } catch (error) {
      
      console.log("Login Error:", error)
      setError(error.message);
      showAlert("danger","An error occurred. Please try again.")

    }finally{
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setCredentials({...credentials,[e.target.name]:e.target.value})
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label"> Email address </label>
          <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={handleChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"> Password </label>
          <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" > Login </button>
      </form>
    </div>
  );
};

export default Login;
