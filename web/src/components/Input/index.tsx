import React from 'react'

import './index.css'

interface InputProps {
  type: string,
  name: string,
  id?: string,
  placeholder?: string,
  value?: string,
  defaultValue?: string
  handdleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handdleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = (props) => {

  return <input
    type={props.type}
    name={props.name}
    id={props.id}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.handdleChange}
    onBlur={props.handdleBlur}
    defaultValue={props.defaultValue}
  />
}

export default Input;
