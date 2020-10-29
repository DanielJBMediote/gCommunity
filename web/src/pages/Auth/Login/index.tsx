import React from 'react';

import './index.css';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import logo from '../../../assets/joystick2.png'
import api from '../../../services/api'

const Login = () => {


  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [span, setSpan] = React.useState({ text: '' });

  function onChangeEmail(event: any) { setEmail(event.target.value) }

  function onChangePassword(event: any) { setPassword(event.target.value) }

  function handdleLogoClick(event: any) { window.location.href = "/"; }

  function onSubmitForm() {
    console.log(email);
    console.log(password);

    const user = {
      email: email,
      password: password
    }

    api.post('/session', user).then(res => {
      sessionStorage.setItem('token', res.data.token);
      window.location.href = '/';
    }, fail => {
      setSpan({
        text: 'Email e Senha não se correspondem'
      })
    })
  }

  return (
    <>
      <div className="login-content">
        <form className="login-modal">
          <img src={logo} alt="" onClick={handdleLogoClick} />
          <h1>GCommunity</h1>
          <label htmlFor="email">usuario</label>
          <Input name="email" type="text" handdleChange={onChangeEmail} />
          <label htmlFor="password">senha</label>
          <Input name="password" type="password" handdleChange={onChangePassword} />
          <span>{span.text}</span>
          <Button handdleClick={onSubmitForm} type="button" label="entrar" />
          <a href="/cadastro">Criar uma conta agora</a>
        </form>
      </div>
    </>
  );
}

export default Login