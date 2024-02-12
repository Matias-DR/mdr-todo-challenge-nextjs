import complete from '@/assets/ok-success.svg'
import incomplete from '@/assets/ok-unsuccess.svg'
import Image from 'next/image'
import remove from '@/assets/remove.svg'

import {
  useState,
  ReactNode
} from 'react'


/**
 * The properties of the task component.
 * @arg {number} pk - The primary key of the task.
 * @arg {string} title - The title of the task.
 * @arg {string} description - The description of the task.
 * @arg {boolean} completed - A boolean to indicate if the task is completed.
 * @arg {Date} created - The date when the task was created.
 * @arg {function} handleRemove - A function to remove the task.
 */
interface Props {
  pk: number
  title: string
  description: string
  completed: boolean
  created: Date
  handleRemove: (pk: number) => void
}

/**
 * A task component that can be used to display a task, modify it and delete it.
 * @arg {Props} props - The properties of the task component.
 */
export default function TaskComponent(props: Props): ReactNode {
  const { pk, handleRemove } = props
  const [title, setTitle] = useState(props.title)
  const [description, setDescription] = useState(props.description)
  const [completed, setCompleted] = useState(props.completed)
  const [active, setActive] = useState(false)

  return <div className={`
    w-full
    px-2 py-2
    flex flex-col
    ${completed ? 'bg-emerald-950' : 'bg-zinc-800'}
    border border-zinc-700
  `}>
    <div className='
      flex items-center gap-2
    '>

      {/* Title Input */}
      <input
        className='
            size-full min-h-[2.9rem]
            mb-1 px-2 py-1
            appearance-none resize-none
            text-xl font-bold text-zinc-100
            bg-transparent
            focus:outline-none focus:border-b focus:border-zinc-700
            placeholder:text-zinc-700 placeholder:italic
          '
        value={title}
        placeholder='Título...'
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className='
        h-full
        flex
        place-content-evenly items-center
        gap-2
      '>

        {/* Complete/Incomplete action button */}
        <div className='size-[1rem]'>
          <button onClick={() => setCompleted(!completed)}>
            <Image
              src={completed ? complete : incomplete}
              alt='status'
            />
          </button>
        </div>

        <div className='size-[1rem]'>

          {/* Remove action button */}
          <button onClick={() => setActive(true)}>
            <Image
              src={remove}
              alt='flag'
            />
          </button>

          {/* Remove modal confirmation popup */}
          <div className={`
            ${active ? 'absolute' : 'hidden'} z-10 top-0 left-0
            size-full
            flex flex-col justify-center items-center
            bg-zinc-900/75
          `}>
            <div className='
              relative
              max-w-max
              p-8
              flex flex-col justify-center items-start
              bg-zinc-800
            '>
              <p className='mb-4'>
                Eliminar la tarea?
              </p>
              <div className='flex'>

                {/* Confirmation remove button */}
                <div className='w-28 h-10'>
                  <button
                    className='
                      py-2 px-4
                      font-bold text-zinc-100
                      bg-red-600
                      border-b-2 border-e-2 border-red-400
                      hover:bg-red-800
                      active:border-0
                    '
                    onClick={() => {
                      setActive(false)
                      handleRemove(pk)
                    }}
                  >
                    Eliminar
                  </button>
                </div>

                {/* Cancelation remove button */}
                <div className='w-28 h-10'>
                  <button
                    className='
                      py-2 px-4
                      font-bold text-zinc-100
                      bg-zinc-600
                      border-b-2 border-e-2 border-zinc-400
                      hover:bg-zinc-700
                      active:border-0
                    '
                    onClick={() => setActive(false)}
                  >
                    Cancelar
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* Description input */}
    <textarea
      className='
        w-full h-full min-h-[1.8rem]
        mb-1 px-2 py-1
        flex-grow
        appearance-none resize-none
        font-bold text-zinc-100
        bg-transparent
        scrollbar-y-zinc
        focus:outline-none focus:border-b focus:border-zinc-700 focus:resize-y
        placeholder:text-zinc-700 placeholder:italic
      '
      rows={1}
      value={description}
      placeholder='Descripción...'
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>
}
