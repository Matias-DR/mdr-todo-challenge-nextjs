import { InputType } from '@/commons/element-types'


interface Props {
  id: string
  type: InputType
  label?: string
  helper?: string
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
  helper,
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
      onClick={onClick && onClick}
      onChange={onChange && onChange}
      onFocus={onFocus && onFocus}
      onBlur={onBlur && onBlur}
    />
    {helper && <div className='w-full mb-2'>
      <p className={`${helper ? '' : 'hidden'} text-red-500 text-xs italic`}>
        {helper}
      </p>
    </div>}
  </>
}