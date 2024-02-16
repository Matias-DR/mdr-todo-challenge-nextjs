import axios from 'axios'

import {
  NotificationStatus,
  useHomeContext,
  useNotificationContext
} from '@/contexts'
import {
  CreateTaskComponent,
  TaskType,
  TaskComponent
} from './'
import {
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'


/**
 * A task set component that can be used to display a set of tasks and
 * aggregate them.
 */
export default function TaskSetComponent(): ReactNode {
  const [tasks, setTasks] = useState<Array<TaskType>>([])
  const {
    status,
    searched,
    dateFrom,
    dateTo
  } = useHomeContext()
  const {
    setMessage,
    setStatus
  } = useNotificationContext()

  useEffect(
    () => {
      const query = ''
      const url = `api/task/${query}`
      axios.get(url)
        .then((response: any) => {
          setTasks(response.data)
        })
        .catch((error: any) => {
          setMessage(error.response.data.message)
          setStatus(NotificationStatus.ERROR)
        })
    }, [
    status,
    searched,
    dateFrom,
    dateTo
  ])

  /**
   * Create a task, aggregate it to the set of tasks and send it to the
   * endpoint for creating tasks. Does not allow to create without both title
   * and description, needs almost one of them.
   * @arg {TaskType} task - The task to create.
   */
  const handleCreate = (task: TaskType) => {
    if (!task.title && !task.description) return
    axios.post('api/task', task)
      .then(() => {
        setTasks([
          task,
          ...tasks
        ])
      })
      .catch((error: any) => {
        setMessage(error.response.data.message)
        setStatus(NotificationStatus.ERROR)
      })
  }

  // const handleModify = ()

  /**
   * Remove a task by primary key and send it to the endpoint for removing
   * tasks.
   * @arg pk - The primary key of the task to remove.
   */
  const handleRemove = (pk: number): void => {
    axios.delete(`api/task/${pk}`)
      .then((res: any) => {
        setTasks(tasks.filter((_, index) => index !== pk))
      })
      .catch((error: any) => {
        setMessage(error.response.data.message)
        setStatus(NotificationStatus.ERROR)
      })
  }

  /**
   * Create the order of the task by your index.
   * @arg index - The index of the task.
   */
  const craftOrder = (index: number): string => `order-${index + 1}`

  // Re-render the list of tasks when they are removed or added.
  useEffect(() => {
  }, [tasks])

  // draggable
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (index: number) => {
    if (draggedItem === null || draggedItem === index) return

    const newTasks = [...tasks]
    const draggedCard = newTasks[draggedItem]

    newTasks.splice(draggedItem, 1)
    newTasks.splice(index, 0, draggedCard)

    setTasks(newTasks)
    setDraggedItem(index)
  }
  // draggable

  return <div className='
    w-full
    grid
    grid-rows-2
    grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4
    gap-2
  '>

    {/* Add task button */}
    <div
      key={'add-task-button'}
      className='
        min-h-[13.1rem]
        row-span-2
        order-0
      '
    >
      <CreateTaskComponent handleCreate={handleCreate} />
    </div>

    {/* Tasks */}
    {tasks.map((
      elem,
      index
    ) => <div
      key={index}
      draggable
      onDragStart={() => { handleDragStart(index) }}
      onDragOver={() => { handleDragOver(index) }}
      className={`
        size-full
        ${craftOrder(index)}
      `}
    >
        <TaskComponent
          key={'task-' + index}
          // Acá va la pk, no index
          pk={index}
          title={elem.title}
          description={elem.description}
          completed={false}
          created={new Date()}
          handleRemove={handleRemove}
        />
      </div>)}
  </div>
}
