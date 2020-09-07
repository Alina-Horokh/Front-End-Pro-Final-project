import React from 'react';
import './App.css';
import LogoHeader from './components/logo/logo.component'
import data from './data.json';
import Student from './components/student/student.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <LogoHeader></LogoHeader>

        <div className="App">
          <p>Front End Pro (01.06.2020)</p>
          <a href='#students' className='btn-header'>К списку студентов</a>
        </div>
      </header>

      <div id='students'>
      <table>
          <tr>
            <td>Рейтинг</td>
            <td>Студент</td>
            <td>Баллы</td>
            <td>Сдано домашек</td>
            <td>Средний балл</td>
            <td>Оценка сертификата</td>
          </tr>
        {data.students.map(student => (        
          <Student 
            id={student._id}
            name={student.first_name + ' '+ student.last_name}
            position={student.position}
            points={student.points}
            homeworks={student.homeworks}
            rating={student.rating}
            grade={student.grade}
          >
          </Student>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;
