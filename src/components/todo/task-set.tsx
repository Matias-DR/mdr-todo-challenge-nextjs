import { TaskComponent } from './'


const tasks = {
  1: { title: 'Tarea 1', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 1' },
  2: { title: 'Tarea 2', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 2' },
  3: { title: 'Tarea 3', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 3' },
  4: { title: 'Tarea 4', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 4' },
  5: { title: 'Tarea 5', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 5' },
  6: { title: 'Tarea 6', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 6' },
  // 7: { title: 'Tarea 7', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 7' },
  // 8: { title: 'Tarea 8', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 8' },
  // 9: { title: 'Tarea 9', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 9' },
  // 10: { title: 'Tarea 10', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 10' },
  // 11: { title: 'Tarea 11', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 11' },
  // 12: { title: 'Tarea 12', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 12' },
  // 13: { title: 'Tarea 13', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 13' },
  // 14: { title: 'Tarea 14', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 14' },
  // 15: { title: 'Tarea 15', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 15' },
  // 16: { title: 'Tarea 16', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 16' },
  // 17: { title: 'Tarea 17', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 17' },
  // 18: { title: 'Tarea 18', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 18' },
  // 19: { title: 'Tarea 19', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 19' },
  // 20: { title: 'Tarea 20', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 20' },
  // 21: { title: 'Tarea 21', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 21' },
  // 22: { title: 'Tarea 22', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 22' },
  // 23: { title: 'Tarea 23', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 23' },
  // 24: { title: 'Tarea 24', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 24' },
  // 25: { title: 'Tarea 25', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae eum sequi eveniet laborum reprehenderit cum quos nesciunt ab quisquam distinctio facere inventore facilis dicta magni unde, animi numquam quod. de la tarea 25' },
}

export default function TaskSetComponent() {
  return <div className='size-full grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2'>
    {Object.entries(tasks).map((entry) => <TaskComponent
      key={entry[0]}
      id={entry[0]}
      title={entry[1].title}
      description={entry[1].description}
    />)}
  </div>
}
