import React, { useContext } from "react";
import attendanceContext from "../context/attendance/attendanceContext";

const Alert = () => {
  const context = useContext(attendanceContext);
  const { alert} = context;
  const capitalize = (word) => {
    
    const lower = word==="success"?word.toLowerCase():"error".toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{height:'50px'}}>
    {alert && (
      <div
        className={`alert alert-${alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(alert.type)}</strong> : {alert.message}
      </div>
    )}
    </div>
  );
};

export default Alert;
