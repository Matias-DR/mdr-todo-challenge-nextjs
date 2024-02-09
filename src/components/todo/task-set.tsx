import { HomeContext } from '@/contexts'
import { TaskComponent } from './'
import { useContext, useEffect, useState } from 'react'


const _tasks = [
  { title: '1', description: '1' },
  { title: '2', description: '2' },
  { title: '3', description: '3' },
  { title: '4', description: '4' },
  { title: '5', description: '5' }
]

export default function TaskSetComponent() {
  const [tasks, setTasks] = useState(_tasks)
  const context = useContext(HomeContext)

  useEffect(() => { }, [tasks])

  useEffect(() => {
    if (context.add) {
      context.setAdd(false)
      setTasks([
        { title: '', description: '' },
        ...tasks
      ])
    }
  },
    [context.add]
  )

  return <div className='w-full flex flex-wrap place-content-start gap-2'>
    {Object.entries(tasks).map((
      entry,
      index
    ) => <div
      key={'TaskComponent-container-' + entry[0]}
      className={`basis-full sm:basis-[49.41%] lg:basis-[32.9%] 2xl:basis-[24.6%] ${index === 0 ? 'order-first' : ''}`}
    >
        <TaskComponent
          key={'TaskComponent-' + entry[0]}
          id={entry[0]}
          title={entry[1].title}
          description={entry[1].description}
        />
      </div>)}
  </div>
}
