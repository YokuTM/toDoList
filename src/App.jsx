import './App.scss';
import Task from './components/task/task';
import AddTaskForm from './components/add_task/add_task_form';
import { useEffect, useRef, useState } from "react";
import SortPanel from './components/sort_panel/Sort_panel';

import Trash from './trash.png'


function App() {

  function create_active_status_tasks () {
    return tasks.map((e)=>{
      return {
        task_id:e.id,
        status: false
      }
    })
  }

  function get_init_tasks () {
    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) 
    
    return tasksFromStorage ? tasksFromStorage : []
  }

  function editModalTask () {

    if (title_modal.current.value.trim() && description_modal.current.value.trim() && time_modal.current.value.trim()) {
      let update_tasks = tasks.map((e)=>{
        if (e.id === modal_state.id) {
          return {
            title:title_modal.current.value,
            description: description_modal.current.value,
            time: time_modal.current.value,
            status_task: modal_state.status_task,
            id:e.id
          }
        } else {
          return e
        }
      })
  
      set_tasks([...update_tasks])
      set_valid_state(true)
      close_modal()
    } else {
      set_valid_state(false)
    } 
  }

  const title_modal = useRef()
  const description_modal = useRef()
  const time_modal = useRef()

  const [tasks, set_tasks] = useState(get_init_tasks)
  const [displayTasks, set_display_tasks] = useState([])

  const [active_status_tasks, set_active_status_tasks] = useState(create_active_status_tasks)

  const [sorting_type, set_sorting_type] = useState('ALL')

  const [modal_status, set_modal_status] = useState(false)

  const [modal_state, set_modal_state] = useState({})

  const [valid_state, set_valid_state] = useState (true)

  function sortingTasksToDate (a,b) {
    if (a.time > b.time) {
      return 1
    }
    if (a.time < b.time) {
      return -1
    }

    return 0
  }

  function sortingTasks (type) {
    console.log(type)
    let task_list = []

    if (type === 'ALL') {
      task_list= [...tasks]
    } else if (type === 'TIME') {
      task_list= [...tasks]
      task_list.sort(sortingTasksToDate)
    } else  {
      task_list = tasks.filter((e)=>{
        return e.status_task === type
      })
    }
    console.log(task_list)
    return task_list
  }


  //Записываем таски в LocalStorage и обновляем статусы активности, при изменении
  //Списка задач
  useEffect(()=>{

    localStorage.setItem('tasks', JSON.stringify(tasks));

    set_display_tasks(sortingTasks(sorting_type))

    set_active_status_tasks(create_active_status_tasks)

  },[tasks])

  useEffect(()=>{
    set_display_tasks(sortingTasks(sorting_type))
  },[sorting_type])

  useEffect(()=>{
    if(modal_state.id) {
      set_modal_status(true)
    }
  },[modal_state])

  function update_tasks (new_tasks) {

    let ids = tasks.map((t) => {
      return t.id
    })

    //Выставляем айдишник для новой задачи
    const maxIdValue = ids.length  ? Math.max(...ids) + 1 : 1

    new_tasks[0].id = maxIdValue

    new_tasks[0].status_task = 'NOT READY'

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

    let modal_state = tasks.filter((e)=>{
      return e.id === task_id
    })
    set_modal_state({...modal_state[0]})
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

  function changeTaskStatus (task) {
    let update_tasks = tasks.map ((e)=>{
      if (e.id === task.id) {
        return task
      } else {
        return e
      }
    })

    set_tasks(update_tasks)
  }

  function changeSortingTipe (value) {
    set_sorting_type(value)
  }

  function close_modal () {
    set_modal_state({})
    set_modal_status(false)
  }

  function changeModalTaskStatus (type) {
    modal_state.status_task = type
    set_modal_state({...modal_state})
  }

  function deleteModalTask () {
    let update_tasks = tasks.filter((e)=>{
      return e.id !== modal_state.id
    })

    set_tasks(update_tasks)
  }

  return (
    <div className='app_wrapper' >
      <div className='app_title'>
          Todo List
        </div>
      <div className='app_content'>
        <div className='add_tasks_wrapper'>
            <AddTaskForm  update_tasks={update_tasks}/>
        </div>
        <div className='task_list_wrapper'>
          <SortPanel changeSortingTipe={changeSortingTipe} />
        {displayTasks.length===0&&<div className='no_tasks' >No tasks</div>}
        <ul className='task_list' >
            {displayTasks.map((elem) => {
                return <Task changeTaskStatus={changeTaskStatus} deleteTask={deleteTask} editTask={editTask} change_active_status={change_active_status}  active_status_tasks={active_status_tasks} task= {elem} />
            })
            }
        </ul>
        </div>
      </div>
      {modal_status&&
      <div className='modal_wrapper'>
      <div onClick={close_modal}  className='close_modal'>X</div>
      <div className='modal'>
          {!valid_state&&<div className='no_valid_modal' >Fill in all the fields !!!</div>}
          <div className='modal_title' >
              <input ref={title_modal} defaultValue={modal_state.title} className='modal_title_input' type="text"  />
          </div>
          <div className='model_description'>
              <textarea ref={description_modal} defaultValue={modal_state.description}  placeholder='add Description :' rows='3' className='model_description_textarea' name="addTask" ></textarea>
          </div>
          <div className='modal_date_wrapper'>
               <input ref={time_modal} defaultValue={modal_state.time}  className='modal_date' type="date"  />
          </div>
          <div className='modal_buttons'>
            {/* <div  className='modal_done_wrapper'>
                <div className='modal_done'>RESET</div>
            </div> */}
            <div className="footer_task">
              <div className="status_task">
                  <button onClick={()=>{
                      changeModalTaskStatus('DONE')
                  }} 
                  style={{'backgroundColor':'rgb(2, 76, 12)', borderWidth: modal_state.status_task === 'DONE'? '1px':'0px'}} className='sort_button'>DONE</button>
                  <button onClick={()=>{
                      changeModalTaskStatus('NOT READY')
                  }}
                  style={{'backgroundColor':'rgb(146, 28, 28)',borderWidth: modal_state.status_task === 'DONE'? '0px':'1px'}} className='sort_button'>NOT READY</button>
              </div>
              <div className="task_delete">
                      <img onClick={deleteModalTask} width='30px' height='30px' src={Trash} alt="" />
              </div>
          </div>
          <div  className='modal_done_wrapper'>
                <div onClick={editModalTask} className='modal_done'>Edit</div>
          </div>
        </div>
      </div>
    </div>}
    </div>
  );
}

export default App;
