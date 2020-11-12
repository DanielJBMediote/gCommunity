import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { FaUserAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import "./index.scss";

import httpClient from "../../services/api";
import { AxiosError } from "axios";

const Cadastro = () => {
  const [newUser, setNewUser] = React.useState({});

  const onInputChange = React.useCallback((e) => {
    setNewUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onSubmitForm = React.useCallback(() => {
    httpClient
      .post("/register", newUser)
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  }, [newUser]);

  return (
    <>
      <div className="backBtn">
        <a href="/">
          <button className="mainBtn">
            <IoMdArrowRoundBack />
          </button>
        </a>
      </div>
      <form className="form-modal">
        <h2>New Account</h2>
        <div className="input-username">
          <label htmlFor="">username</label>
          <FaUserAlt className="icon" />
          <Input type="text" name="username" handdleChange={onInputChange} />
        </div>
        <div className="input-email">
          <label htmlFor="">email</label>
          <MdEmail className="icon" />
          <Input type="email" name="email" handdleChange={onInputChange} />
        </div>
        <div className="input-password">
          <label htmlFor="">password</label>
          <RiLockPasswordFill className="icon" />
          <Input
            type="password"
            name="password"
            handdleChange={onInputChange}
          />
        </div>
        <Button type="button" handdleClick={onSubmitForm} label="Sign Up" />
        <a href="/login">Already have an Account? Sign In now!</a>
      </form>
    </>
  );
};

export default Cadastro;
