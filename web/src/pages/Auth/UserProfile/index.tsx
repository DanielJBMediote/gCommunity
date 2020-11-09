import React from 'react'
import { AiFillCalendar } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Navbar from '../../../components/Navbar';
import api from '../../../services/api';

import './index.css'

const UserProfile = () => {

  let [previewURL, setPreviewUrl] = React.useState('http://placehold.it/70');
  let [user, setuser] = React.useState({
    username: '', email: '',
    fullname: '', age: '',
    file: ''
  });

  function formatString(e: any) {

  }

  React.useEffect(() => {
    api.get('/user/data', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('@app/token')}`
      }
    }).then(success => {
      user = {
        username: success.data.username,
        fullname: success.data.fullname,
        email: success.data.email,
        age: success.data.age,
        file: success.data.file
      };
      console.log(user);

    }, fail => {
      console.log(fail);
    })
  }, [])

  function readURL(e: any) {
    if (e.target.files && e.target.files[0]) {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (

    <><Navbar />
      <div className="profile-modal">
        <div>

          <div className="section">
            <img id="file_upload"
              src={(!user.file) ? previewURL : user.file} alt="your image" className="upload-img" />
            <div className="input-file-upload">
              <input type='file' id="file-input" onChange={readURL} />
            </div>
          </div>
          <div className="section">
            <label htmlFor="">username</label>
            <FaUserAlt className="icon" />
            <Input type="text" name="username" defaultValue={user.username} />
          </div>
          <div className="section">
            <label htmlFor="">full name</label>
            <FaUserAlt className="icon" />
            <Input type="text" name="fullname" />
          </div>
          <div className="section">
            <label htmlFor="">email</label>
            <MdEmail className="icon" />
            <Input type="text" name="email" />
          </div>
          <div className="section">
            <label htmlFor="">birth date</label>
            <AiFillCalendar className="icon" />
            <Input type="text" name="age" handdleChange={formatString} />
          </div>
          <Button label="Update Profile" />
        </div>

      </div></>
  );
}

export default UserProfile