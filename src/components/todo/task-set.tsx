import { HomeContext } from '@/contexts'
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
  const [tasks, setTasks] = useState<any[]>([])
  const {
    status,
    searched,
    dateFrom,
    dateTo
  } = useContext(HomeContext)

  /**
   * Create a task, aggregate it to the set of tasks and send it to the
   * endpoint for creating tasks. Does not allow to create without both title
   * and description, needs almost one of them.
   * @param {TaskType} task - The task to create.
   */
  const handleCreate = (task: TaskType) => {
    if (!task.title && !task.description) return
    // POST /api/task/ → setTasks(tasksFetched)
    setTasks([
      task,
      ...tasks
    ])
  }

  // const handleModify = ()

  /**
   * Remove a task by primary key and send it to the endpoint for removing
   * tasks.
   * @param pk - The primary key of the task to remove.
   */
  const handleRemove = (pk: number): void => {
    setTasks(tasks.filter((_, index) => index !== pk))
  }

  /**
   * Create the order of the task by your index.
   * @param index - The index of the task.
   */
  const craftOrder = (index: number): string => `order-${index + 1}`

  // Re-render the list of tasks when they are removed or added.
  useEffect(() => {
    console.log('tasks', tasks)
  }, [tasks])

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
      key={'task-container-' + index}
      className={`
        size-full
        ${craftOrder(index)}
      `}
    >
      <TaskComponent
        key={'task-' + index}
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
