import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const res = await axios.get('/api/student/attendance', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAttendance(res.data);
    };
    fetchAttendance();
  }, [user]);

  const checkIn = async () => {
    await axios.post('/api/student/checkin', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  const checkOut = async () => {
    await axios.post('/api/student/checkout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={checkIn}>Check In</button>
      <button onClick={checkOut}>Check Out</button>
      <h2>Attendance</h2>
      <ul>
        {attendance.map((att) => (
          <li key={att._id}>
            {new Date(att.date).toDateString()} - Check In: {new Date(att.checkIn).toLocaleTimeString()} - Check Out: {att.checkOut ? new Date(att.checkOut).toLocaleTimeString() : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
