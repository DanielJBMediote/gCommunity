import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { AiFillCalendar } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Navbar from "../../../components/Navbar";
import httpClient from "../../../services/api";

import "./index.scss";

const UserProfile = () => {
  const [previewURL, setPreviewUrl] = React.useState("http://placehold.it/70");
  const [userData, setUserData] = React.useState({});
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    httpClient
      .get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@app/token")}`,
        },
      })
      .then((response: AxiosResponse) => {
        setUser(response.data[0]);
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  }, []);

  React.useEffect(() => {
    // httpClient.get(`/file/`)
    console.log(user);
  }, [user]);

  const onInputChange = React.useCallback((e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const updateProfile = React.useCallback(() => {
    console.log(userData);
  }, [userData]);

  const readURL = React.useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile-modal">
        <div>
          <div className="section">
            <img src={previewURL} alt="userPhoto" className="upload-img" />
            <div className="input-file-upload">
              <input type="file" id="file-input" onChange={readURL} />
            </div>
          </div>
          <div className="section">
            <label htmlFor="">usuário</label>
            <FaUserAlt className="icon" />
            <Input type="text" name="username" handdleBlur={onInputChange} />
          </div>
          <div className="section">
            <label htmlFor="">nome completo</label>
            <FaUserAlt className="icon" />
            <Input type="text" name="fullname" handdleBlur={onInputChange} />
          </div>
          <div className="section">
            <label htmlFor="">email</label>
            <MdEmail className="icon" />
            <Input type="text" name="email" handdleBlur={onInputChange} />
          </div>
          <div className="section">
            <label htmlFor="">data de nascimento</label>
            <AiFillCalendar className="icon" />
            <Input type="date" name="age" handdleBlur={onInputChange} />
          </div>
          <Button handdleClick={updateProfile} label="Atualizar Perfil" />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
