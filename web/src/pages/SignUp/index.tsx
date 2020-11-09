import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { FaUserAlt } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md'
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import './index.css';

import api from '../../services/api';


export default class Cadastro extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {}
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onInputChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmitForm() {
    api.post('/register', this.state).then(res => {

      window.location.href = "/login";
    }, fail => {
      console.log(fail);
    })
  }

  render() {
    return (
      <>
        <div className="backBtn">
          <a href="/">
            <button>
              <IoMdArrowRoundBack />
            </button>
          </a>
        </div>
        <form className="form-modal">
          <h2>New Account</h2>
          <div className="input-username">
            <label htmlFor="">username</label>
            <FaUserAlt className="icon" />
            <Input type="text" name="username" handdleChange={this.onInputChange} />
          </div>
          <div className="input-email">
            <label htmlFor="">email</label>
            <MdEmail className="icon" />
            <Input type="email" name="email" handdleChange={this.onInputChange} />
          </div>
          <div className="input-password">
            <label htmlFor="">password</label>
            <RiLockPasswordFill className="icon" />
            <Input type="password" name="password" handdleChange={this.onInputChange} />
          </div>
          <Button type="button" handdleClick={this.onSubmitForm} label="Sign Up" />
          <a href="/login">Already have an Account? Sign In now!</a>
        </form></>
    );
  }
}