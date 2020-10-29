import React from 'react'

import './index.css'

interface InputProps {
  type: string,
  name: string,
  id?: string,
  placeholder?: string,
  value?: string,
  handdleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = (props) => {

  return <input
    type={props.type}
    name={props.name}
    id={props.id}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.handdleChange}
  />
}

export default Input;
