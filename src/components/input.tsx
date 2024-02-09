import { InputType } from '@/commons/element-types'
import {
  FieldError,
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form'


interface Props {
  id: string
  type: InputType
  register: UseFormRegister<any>
  registerOptions: RegisterOptions<any>
  error?: FieldError
  label?: string
  placeholder?: string
  autoFocus?: boolean
  onClick?: (e: any) => void
  onChange?: (e: any) => void
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
  className?: {
    label?: string
    input?: string
  }
}

export default function InputComponent({
  id,
  type,
  register,
  registerOptions,
  error,
  label,
  placeholder,
  autoFocus = false,
  onClick,
  onChange,
  onFocus,
  onBlur,
  className
}: Props) {
  return <>
    {label && <label
      className={`
        block text-zinc-300 text-sm font-bold mb-2 
        ${className && className.label}
      `}
      htmlFor={id}
    >
      {label}
    </label>}
    <input
      className={`
            shadow appearance-none border w-full py-2 px-3 text-zinc-700 
            mb-2 focus:outline-none focus:shadow-outline 
            ${className && className.input}
          `}
      id={id}
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      {...(register && register(
        id,
        registerOptions
      ))}
    />
    <div className='relative w-full h-[1rem] mb-2'>
      {error && <p className={`${error ? 'absolute' : 'hidden'} text-red-500 text-xs italic`}>
        {error.message}
      </p>}
    </div>
  </>
}