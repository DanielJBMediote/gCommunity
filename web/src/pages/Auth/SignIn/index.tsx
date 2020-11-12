import React from "react";
import { AxiosResponse, AxiosError } from "axios";
import "./index.scss";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import logo from "../../../assets/joystick2.png";
import httpClient from "../../../services/api";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [data, setData] = React.useState({ email: "", password: "" });
  const [span, setSpan] = React.useState(<></>);

  const onInputChange = React.useCallback((e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  function handdleLogoClick() {
    window.location.href = "/";
  }

  const handdleInputCheckbox = React.useCallback(
    (e) => {
      if (e.target.checked)
        localStorage.setItem("@app/saved/email", data.email);
      else localStorage.removeItem("@app/saved/email");
    },
    [data]
  );

  const onSubmitForm = React.useCallback(() => {
    httpClient
      .post("/session", data)
      .then((response: AxiosResponse) => {
        localStorage.setItem("@app/token", response.data.token);
        window.location.href = "/";
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          setSpan(
            <span className="warning">Email e Senha não se correspondem</span>
          );
        }
      });
  }, [data]);

  return (
    <>
      <div className="login-content">
        <form className="login-modal" id="form-login">
          <img src={logo} alt="" onClick={handdleLogoClick} />
          <h1>GCommunity</h1>
          <div className="input-username">
            <label htmlFor="email">email</label>
            <FaUserAlt className="icon" />
            <Input
              name="email"
              type="text"
              handdleChange={onInputChange}
              defaultValue={
                localStorage.getItem("@app/saved/email") || undefined
              }
            />
          </div>
          <div className="input-password">
            <label htmlFor="password">password</label>
            <RiLockPasswordFill className="icon" />
            <Input
              name="password"
              type="password"
              handdleChange={onInputChange}
            />
          </div>
          {span}
          <div className="input-chk">
            <input
              type="checkbox"
              defaultChecked={
                localStorage.getItem("@app/saved/email") ? true : false
              }
              name="remember"
              onChange={handdleInputCheckbox}
            />
            <span className="remmember">remember email</span>
          </div>
          <Button handdleClick={onSubmitForm} type="button" label="Login" />
          <a href="/cadastrar">Do not have an Account? Sign Up Now!</a>
        </form>
      </div>
    </>
  );
};

export default Login;
