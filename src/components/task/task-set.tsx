import type { TaskType } from './';

import { useHomeContext, useNotificationContext } from '@/contexts';
import { useEffect, useRef, useState } from 'react';
import { CreateTaskComponent, TaskComponent } from '.';

import axios from 'axios';

/**
 * A task set component that can be used to display a set of tasks and
 * aggregate them.
 */
export default function TaskSetComponent(): React.ReactNode {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const { query } = useHomeContext();
  const queryRef = useRef<string>(query);
  const { setNotification } = useNotificationContext();

  useEffect(() => {
    axios
      .get('/api/task')
      .then((res: { data: TaskType[] }) => {
        setTasks(res.data);
      })
      .catch((error: { response: { data: { message: string } } }) => {
        setNotification(error.response.data.message, 'error');
      });
  }, []);

  useEffect(() => {
    if (query.length === 0 && queryRef.current.length === 0) return;
    axios
      .get(`api/task${query}`)
      .then((res: { data: TaskType[] }) => {
        setTasks(res.data);
      })
      .catch((error: { response: { data: { message: string } } }) => {
        setNotification(error.response.data.message, 'error');
      });
    queryRef.current = query;
  }, [query]);

  /**
   * Create a task, aggregate it to the set of tasks and send it to the
   * endpoint for creating tasks. Does not allow to create without both title
   * and description, needs almost one of them.
   * @arg {TaskType} task - The task to create.
   */
  const handleCreate = (task: TaskType): void => {
    if (task.title.length === 0 && task.description.length === 0) return;
    axios
      .post('api/task', task)
      .then((res: { data: TaskType }) => {
        setTasks([res.data, ...tasks]);
      })
      .catch((error: { response: { data: { message: string } } }) => {
        setNotification(error.response.data.message, 'error');
      });
  };

  const handleUpdate = (
    pk: number,
    title: string,
    description: string,
    completed: boolean,
  ): void => {
    const body = {
      title,
      description,
      completed,
    };
    axios
      .patch(`api/task?pk=${pk}`, body)
      .catch((error: { response: { data: { message: string } } }) => {
        setNotification(error.response.data.message, 'error');
      });
  };

  /**
   * Remove a task by primary key and send it to the endpoint for removing
   * tasks.
   * @arg pk - The primary key of the task to remove.
   */
  const handleRemove = (pk: number): void => {
    axios
      .delete(`api/task?pk=${pk}`)
      .then(() => {
        setTasks(tasks.filter((elem) => elem.pk !== pk));
      })
      .catch((error: { response: { data: { message: string } } }) => {
        setNotification(error.response.data.message, 'error');
      });
  };

  /**
   * Create the order of the task by your index.
   * @arg index - The index of the task.
   */
  const craftOrder = (index: number): string => `order-${index + 1}`;

  return (
    <div
      className='
    w-full
    grid
    grid-rows-2
    grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4
    gap-2
  '
    >
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
      {tasks.map((elem, index) => (
        <div
          key={elem.pk}
          className={`
        size-full
        ${craftOrder(index)}
      `}
        >
          <TaskComponent
            key={'task-' + elem.pk}
            pk={elem.pk!}
            title={elem.title}
            description={elem.description}
            completed={elem.completed!}
            created={new Date(elem.created!)}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
        </div>
      ))}
    </div>
  );
}
