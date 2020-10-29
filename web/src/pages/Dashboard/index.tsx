import React from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api'
import Post from '../Post';
import './index.css';


const Dashboard = () => {

  return (
    <>
      <Navbar />
      <Post />
    </>
  )
}

export default Dashboard