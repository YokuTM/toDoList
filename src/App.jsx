import './App.scss';
import Task from './components/task/task';
import AddTaskForm from './components/add_task/add_task_form';
import { useEffect, useState } from "react";


let mock_tasks = [{
  title: 'Задача 1',
  discription:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  time: 'Время',
  id: 1
  },
  {
  title: 'Задача 2',
  discription:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  time: 'Время',
  id:2
  },
  {
    title: 'Задача 3',
    discription:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: 'Время',
    id:3
  },{
    title: 'Задача 4',
    discription:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: 'Время',
    id:4
  }]

  


function App() {

  function create_active_status_tasks () {
    return tasks.map((e)=>{
      return {
        task_id:e.id,
        status: false
      }
    })
  }

  const [tasks, set_tasks] = useState(mock_tasks)
  const [active_status_tasks, set_active_status_tasks] = useState(create_active_status_tasks)

  useEffect(()=>{
    set_active_status_tasks(create_active_status_tasks)
  },[tasks])

  function update_tasks (new_tasks) {
    const maxIdValue = Math.max(tasks.map((t) => {
      return t.id
    }))
    new_tasks[0].id = maxIdValue
    
    set_tasks([...new_tasks, ...tasks])

  }

  function change_active_status (task_id) {
    // Меняем статус задач
    const update_status = active_status_tasks.map((e)=>{
      if (e.task_id===task_id) {
        return {
          task_id:e.task_id,
          status: true
        }
      } else {
        return {
          task_id:e.task_id,
          status: false
        }
      }
    })
    set_active_status_tasks(update_status)
  }

  function editTask(task) {
    const taskId = task.id
    const updateTasksList = tasks.map((element) => {
      if (taskId === element.id) {
        return task
      } else {
        return element
      }
    })
    set_tasks(updateTasksList)
  }
  
    function deleteTask(id) {
      const updateTasksList = tasks.filter((element) => {
        return element.id !== id
      })
      set_tasks(updateTasksList)
    }

  return (
    <div className='app_wrapper' >
      <div className='app_content'>
        <div className='app_title'>
        toDo List
        </div>
        <div className='add_tasks_wrappe'>
            <AddTaskForm  update_tasks={update_tasks}/>
        </div>
        <ul className='task_list' >
            {tasks.map((elem) => {
                return <Task deleteTask={deleteTask} editTask={editTask} change_active_status={change_active_status}  active_status_tasks={active_status_tasks} task= {elem} />
            })
            }
        </ul>
      </div>
    </div>
  );
}

export default App;
