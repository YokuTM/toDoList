import './add_task.scss'

import {useState, useRef} from "react";

function AddTaskForm (props) {

    const [validState, setValidState] = useState (true)

    const [newTask, setNewTask] = useState({
        title:'',
        description:'',
        time:''
      });


    let titleInput = useRef()
    let descriptionInput = useRef()
    let dateInput = useRef()

    function handleChangeNewTitle(event) {
		setNewTask({...newTask, title: event.nativeEvent.target.value})
	}

    function handleChangeNewDescription(event) {
		setNewTask({...newTask, description: event.nativeEvent.target.value})
	}

    function handleChangeNewDate(event) {
		setNewTask({...newTask, time: event.nativeEvent.target.value})
	}

    function add_task () {
        if (titleInput.current.value.trim() && descriptionInput.current.value.trim() && dateInput.current.value.trim()) {
            props.update_tasks([newTask])
            resetInputs()
            setValidState(true)
        } else {
            setValidState(false)
        }
    }

    function resetInputs () {
        //Сбрасываем поля у формы
        titleInput.current.value = ''
        descriptionInput.current.value = ''
        dateInput.current.value = ''
        //Сбрасываем состояние
        setNewTask({
            title:'',
            description:'',
            time:''
          })
    }

    return (
        <div className='add-task' >
            <div onClick={add_task} className='button_add_task_wrapper'>
                <div className='button_add_task_title' >Add New Tasks      +</div>
            </div>
            <div className='add_title' >
                <input ref={titleInput}  placeholder='add Title :' className='add_title_input' type="text" onChange={handleChangeNewTitle} />
            </div>
            <div className='add_description'>
                <textarea ref={descriptionInput}  placeholder='add Description :' rows='3' className='add_description_textarea' name="addTask" onChange={handleChangeNewDescription}></textarea>
            </div>
            <div className='add_date_wrapper'>
                 <input ref={dateInput}  className='add_date' type="date" onChange={handleChangeNewDate} />
            </div>
            {!validState&&<div className='no_valid' >Fill in all the fields !!!</div>}
        </div>
)
}

export default AddTaskForm