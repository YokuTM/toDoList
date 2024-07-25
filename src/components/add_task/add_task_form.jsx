import './add_task.scss'

import {useState} from "react";

function AddTaskForm (props) {

    const [new_task, set_new_task] = useState({
        title:'',
        description:'',
        time:''
      });

    function handleChangeNewTitle(event) {
		set_new_task({...new_task, title: event.nativeEvent.target.value})
	}

    function handleChangeNewDescription(event) {
		set_new_task({...new_task, description: event.nativeEvent.target.value})
	}

    function handleChangeNewDate(event) {
		set_new_task({...new_task, time: event.nativeEvent.target.value})
	}

    function add_task () {
        props.update_tasks([new_task])
    }

    return (
        <div className='add-task' >
            <div className='add_title' >
                <input type="text" onChange={handleChangeNewTitle} />
            </div>
            <div className='add_discription'>
                {/* <input type="text" onChange={handleChangeNewDescription} /> */}
                <textarea className='add_discription_textarea' name="addTask" onChange={handleChangeNewDescription}></textarea>
            </div>
            <div className='add_date'>
                <input type="date" onChange={handleChangeNewDate} />
            </div>
            <div className='button_add_task'>
                <button onClick={add_task}>Добавить</button>
            </div>
        </div>
)
}

export default AddTaskForm