import React from 'react'

import './index.scss'

interface InputProps {
  type: string,
  name: string,
  id?: string,
  placeholder?: string,
  value?: string,
  inputRef?: React.MutableRefObject<HTMLInputElement>
  defaultValue?: string | undefined
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
    ref={props.inputRef}
  />
}

export default Input;
