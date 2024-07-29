import './App.scss';
import Task from './components/task/task';
import AddTaskForm from './components/add_task/add_task_form';
import { useEffect, useRef, useState } from "react";
import SortPanel from './components/sort_panel/Sort_panel';

import Trash from './trash.png'

import SortButton from './components/sort_button/Sort_button';



function App() {

  function createActiveStatusTasks () {
    return tasks.map((e)=>{
      return {
        taskId:e.id,
        status: false
      }
    })
  }

  function get_init_tasks () {
    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) 
    
    return tasksFromStorage ? tasksFromStorage : []
  }

  function editModalTask () {

    if (titleModal.current.value.trim() && descriptionModal.current.value.trim() && timeModal.current.value.trim()) {
      let update_tasks = tasks.map((e)=>{
        if (e.id === modalState.id) {
          return {
            title:titleModal.current.value,
            description: descriptionModal.current.value,
            time: timeModal.current.value,
            statusTask: modalState.statusTask,
            id:e.id
          }
        } else {
          return e
        }
      })
  
      setTasks([...update_tasks])
      setValidState(true)
      closeModal()
    } else {
      setValidState(false)
    } 
  }

  const titleModal = useRef()
  const descriptionModal = useRef()
  const timeModal = useRef()

  const [tasks, setTasks] = useState(get_init_tasks)
  const [displayTasks, setDisplayTasks] = useState([])

  const [activeStatusTasks, setActiveStatusTasks] = useState(createActiveStatusTasks)

  const [sortingType, setSortingType] = useState('ALL')

  const [modalStatus, setModalStatus] = useState(false)

  const [modalState, setModalState] = useState({})

  const [validState, setValidState] = useState (true)

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
    let taskList = []

    if (type === 'ALL') {
      taskList= [...tasks]
    } else if (type === 'TIME') {
      taskList= [...tasks]
      taskList.sort(sortingTasksToDate)
    } else  {
      taskList = tasks.filter((e)=>{
        return e.statusTask === type
      })
    }
    return taskList
  }


  //Записываем таски в LocalStorage и обновляем статусы активности, при изменении
  //Списка задач
  useEffect(()=>{

    localStorage.setItem('tasks', JSON.stringify(tasks));

    setDisplayTasks(sortingTasks(sortingType))

    setActiveStatusTasks(createActiveStatusTasks)

  },[tasks])

  useEffect(()=>{
    setDisplayTasks(sortingTasks(sortingType))
  },[sortingType])

  useEffect(()=>{
    if(modalState.id) {
      setModalStatus(true)
    }
  },[modalState])

  function updateTasks (newTasks) {

    let ids = tasks.map((t) => {
      return t.id
    })

    //Выставляем айдишник для новой задачи
    const maxIdValue = ids.length  ? Math.max(...ids) + 1 : 1

    newTasks[0].id = maxIdValue

    newTasks[0].statusTask = 'NOT READY'

    setTasks([...newTasks, ...tasks])

  }

  function changeEditorStatus (taskId) {
    // Меняем статус задач
    const update_status = activeStatusTasks.map((e)=>{
      if (e.taskId===taskId) {
        return {
          taskId:e.taskId,
          status: true
        }
      } else {
        return {
          taskId:e.taskId,
          status: false
        }
      }
    })

    let modalState = tasks.filter((e)=>{
      return e.id === taskId
    })
    setModalState({...modalState[0]})
    setActiveStatusTasks(update_status)
  }
  
    function deleteTask(id) {
      const updateTasksList = tasks.filter((element) => {
        return element.id !== id
      })
      setTasks(updateTasksList)
    }

  function changeTaskStatus (task) {
    let updateTasks = tasks.map ((e)=>{
      if (e.id === task.id) {
        return task
      } else {
        return e
      }
    })

    setTasks(updateTasks)
  }

  function changeSortingTipe (value) {
    setSortingType(value)
  }

  function closeModal () {
    setModalState({})
    setModalStatus(false)
  }

  function changeModalTaskStatus (type) {
    modalState.statusTask = type
    setModalState({...modalState})
  }

  function deleteModalTask () {
    let updateTasks = tasks.filter((e)=>{
      return e.id !== modalState.id
    })

    setTasks(updateTasks)
  }

  return (
    <div className='app_wrapper' >
      <div className='app_title'>
          Todo List
        </div>
      <div className='app_content'>
        <div className='add_tasks_wrapper'>
            <AddTaskForm  update_tasks={updateTasks}/>
        </div>
        <div className='task_list_wrapper'>
          <SortPanel changeSortingTipe={changeSortingTipe} />
        {displayTasks.length===0&&<div className='no_tasks' >No tasks</div>}
        <ul className='task_list' >
            {displayTasks.map((elem) => {
                return <Task changeTaskStatus={changeTaskStatus} deleteTask={deleteTask} changeEditorStatus={changeEditorStatus}  activeStatusTasks={activeStatusTasks} task= {elem} />
            })
            }
        </ul>
        </div>
      </div>
      {modalStatus&&
      <div className='modal_wrapper'>
      <div onClick={closeModal}  className='close_modal'>X</div>
      <div className='modal'>
          {!validState&&<div className='no_valid_modal' >Fill in all the fields !!!</div>}
          <div className='modal_title' >
              <input ref={titleModal} defaultValue={modalState.title} className='modal_title_input' type="text"  />
          </div>
          <div className='model_description'>
              <textarea ref={descriptionModal} defaultValue={modalState.description}  placeholder='add Description :' rows='3' className='model_description_textarea' name="addTask" ></textarea>
          </div>
          <div className='modal_date_wrapper'>
               <input ref={timeModal} defaultValue={modalState.time}  className='modal_date' type="date"  />
          </div>
          <div className='modal_buttons'>
            <div className="footer_task">
              <div className="status_task">
              <SortButton changeTaskStatus={changeModalTaskStatus} type={{
                        color: 'rgb(2, 76, 12)',
                        active: modalState.statusTask==='DONE',
                        value: 'DONE'
              }} />
               <SortButton changeTaskStatus={changeModalTaskStatus} type={{
                        color: 'rgb(146, 28, 28)',
                        active: modalState.statusTask==='NOT READY',
                        value: 'NOT READY'
                }} />
              </div>
              <div className="task_delete">
                      <img onClick={deleteModalTask} width='30px' height='30px' src={Trash} alt="" />
              </div>
          </div>
          <div onClick={editModalTask} className='modal_done_wrapper'>
                <div  className='modal_done'>Edit</div>
          </div>
        </div>
      </div>
    </div>}
    </div>
  );
}

export default App;
