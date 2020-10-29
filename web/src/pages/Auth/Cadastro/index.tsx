import React from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import { IoMdArrowRoundBack } from 'react-icons/io';
import './index.css';


export default function Cadastro() {

  function onSubmitForm() {

  }

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
        <label htmlFor="">username</label>
        <Input type="text" name="username" />

        <label htmlFor="">email</label>
        <Input type="text" name="username" />

        <label htmlFor="">password</label>
        <Input type="text" name="username" />

        <Button type="button" handdleClick={onSubmitForm} label="Cadastrar" />
      </form></>
  );
}