import React from 'react';

import './index.css';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import logo from '../../../assets/joystick2.png'
import api from '../../../services/api'
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

export default class Login extends React.Component {
  span: string;

  constructor(props: any) {
    super(props);
    this.state = {}
    this.span = ''
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onInputChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handdleLogoClick(event: any) { window.location.href = "/"; }

  onSubmitForm() {
    console.log(this.state);

    api.post('/session', this.state).then(res => {
      localStorage.setItem('@app/token', res.data.token);
      window.location.href = '/';
    }, fail => {
      this.span = 'Email e Senha não se correspondem'
    })
  }

  render() {
    return (
      <>
        <div className="login-content">
          <form className="login-modal">
            <img src={logo} alt="" onClick={this.handdleLogoClick} />
            <h1>GCommunity</h1>
            <div className="input-username">
              <label htmlFor="email">email</label>
              <FaUserAlt className="icon" />
              <Input name="email" type="text" handdleChange={this.onInputChange} />
            </div>
            <div className="input-password">
              <label htmlFor="password">password</label>
              <RiLockPasswordFill className="icon" />
              <Input name="password" type="password" handdleChange={this.onInputChange} />
            </div>
            <span>{this.span}</span>
            <Button handdleClick={this.onSubmitForm} type="button" label="Login" />
            <a href="/cadastrar">Do not have an Account? Sign Up Now!</a>
          </form>
        </div>
      </>
    );
  }
}