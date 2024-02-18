import React from 'react'

const attendanceList = (props) => {
    
    
  return (
    <tr>
    <th>{props.index}</th>
    <td>{props.title}</td>
    <td className={`${props.status==='present'?'table-success':''}`}>{props.status}</td>
    </tr>
  )
}

export default attendanceList
