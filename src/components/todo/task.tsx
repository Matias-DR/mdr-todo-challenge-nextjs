import { InputComponent } from '@/components'
import { InputType } from '@/commons/element-types'
import { useState } from 'react'


interface Props {
  id: string
  title: string
  description: string
}

export default function TaskComponent({
  id,
  title,
  description
}: Props) {
  const [checked, setChecked] = useState(false)

  const handleCheck = () => {
    setChecked(!checked)
  }

  const handleDescriptionBlur = (e: any) => {
    console.log(e.target.innerText != description)
  }

  const handleTitleBlur = (e: any) => {
    console.log(e.target.innerText != title)
  }

  return <div className='w-full h-fit px-2 py-2 flex flex-col bg-zinc-800 border border-zinc-700'>
    <div>
      <div className='flex items-center'>
        <h1
          className='mb-1 flex-grow text-xl'
          contentEditable
          onBlur={handleTitleBlur}
        >
          {title}
        </h1>
        <input
          id={id}
          type={InputType.CHECK}
          onChange={handleCheck}
          className='appearance-auto w-auto ms-2'
        />
      </div>
    </div>
    <p
      className='flex-grow y-zinc-scrollbar'
      contentEditable
      onBlur={handleDescriptionBlur}
    >
      {description}
    </p>
  </div>
}
