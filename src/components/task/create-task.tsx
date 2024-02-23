import Image from 'next/image'
import plus from '@/assets/plus.svg'

import { useState } from 'react'

export interface TaskType {
  title: string
  description: string
  pk?: number
  completed?: boolean
  created?: string
}

/**
 * The properties of the task component.
 * @arg {function} handleCreate - A function to create the task.
 */
interface Props {
  handleCreate: (task: TaskType) => void
}

/**
 * A task component that can be used to display a task, modify it and delete it.
 * @arg {Props} props - The properties of the task component.
 */
export default function CreateTaskComponent ({
  handleCreate
}: Props): React.ReactNode {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  return (
    <div
      className={`
    size-full
    px-2 py-2
    flex flex-col
    bg-zinc-800
    border border-zinc-700
  `}
    >
      {/* Title Input */}
      <input
        className="
          w-full
          mb-1 px-2 py-1
          appearance-none resize-none
          text-xl font-bold text-zinc-100
          bg-transparent
          focus:outline-none focus:border-b focus:border-zinc-700
          placeholder:text-zinc-700 placeholder:italic
        "
        value={title}
        placeholder="Título..."
        onChange={(e) => { setTitle(e.target.value) }}
      />

      {/* Description input */}
      <textarea
        className="
        flex-grow
        mb-1 px-2 py-1
        appearance-none resize-none
        font-bold text-zinc-100
        bg-transparent
        scrollbar-y-zinc
        focus:outline-none focus:border-b focus:border-zinc-700 focus:resize-y
        placeholder:text-zinc-700 placeholder:italic
      "
        rows={1}
        value={description}
        placeholder="Descripción..."
        onChange={(e) => { setDescription(e.target.value) }}
      />

      {/* Create task button */}
      <div className="w-full">
        <button
          onClick={() => {
            handleCreate({
              title,
              description
            })
          }}
          className="
          size-full
          flex justify-center items-center
        "
        >
          <Image src={
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            plus
          } alt="plus" className="size-[4.4rem]" />
        </button>
      </div>
    </div>
  )
}
