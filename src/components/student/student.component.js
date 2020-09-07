import React from 'react';

function Student(props) {
  return (
    <tr key={props.id}>
      <td>{props.position}</td>
      <td>{props.name}</td>
      <td>{props.points}</td>
      <td>{props.homeworks}</td>
      <td>{props.rating}</td>
      <td>{props.grade}</td>
    </tr>
  );
}

export default Student;