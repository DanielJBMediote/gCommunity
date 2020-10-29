import React from 'react';
import Navbar from '../../components/Navbar';

import api from '../../services/api'
import './index.css'

const Post = () => {


  api.get('/post').then(res => {
    return res.data
  })

  return (
    <>
      <Navbar />
    </>
  )

}

export default Post