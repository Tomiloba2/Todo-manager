import * as React from 'react';

export interface IInputFieldProps {
  value:string;
  name: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onblur?: () => void;
  error?: string
}

export default function InputField(props: IInputFieldProps) {
  return (
    <div className='auth'>
      <input
        id={props.name}
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onblur}
        required />
      <p className='input-error'>{props.error}</p>
    </div>
  );
}
