import {useEffect, useState, useRef, createElement} from "react";

import './task.scss'
import Edit from './edit_defoult.png'
import Trash from './trash.png'
import Done from './done.png'
import Close from './close.png'

function Task(props) {

    let status = props.active_status_tasks.filter((e) => {
       return e.task_id === props.task.id
    })[0].status


    const [edit_status, set_edit_status] = useState (false)
    const [activ_status, set_activ_status] = useState (status)

    const editor = useRef()

    useEffect(()=>{
        set_activ_status(status)
    })

    const elem = createElement('div')
    document.body.append(elem)

    {
        
    }

    function start_edit () {
        set_edit_status(true)
    }

    function close_edit () {
        set_edit_status(false)
    }

    function change_active_status () {
        props.change_active_status(props.task.id)
    }

    function editTask() {
        let updateTask = props.task
        updateTask.discription = editor.current.value
        props.editTask(updateTask)
        close_edit()
        // console.log(editor)
    }

    return (
        <li className="task" onClick={change_active_status} >
            <div className='header_task'>
                <div className="task_title">{props.task.title}</div>
                {/* <div className="task_time">{data.task.time}</div> */}
            </div>
            <div className='task_content' >
                <div style={{'backgroundColor':activ_status?'grey':''}} className="marker"></div>
                <div className="task_discription">
                    {!edit_status&&<div className='show_discription'>{props.task.discription}</div>}
                    {edit_status&&<div className='edit_discription'><textarea ref={editor} autoFocus rows='5' className="edit_textarea" name="" id="">{props.task.discription}</textarea></div>}
                </div>
                <div className="buttons_task">
                    {edit_status&&<div onClick={close_edit} className="close_editor" ><img src={Close} alt="" width='20px' height='20px'/></div>}
                    <div className="task_edit">
                        <div className='edit_icon'>
                            {!edit_status&&<img onClick={start_edit} width='20px' height='20px' src={Edit} alt="" />}
                            {edit_status&&<img onClick={editTask} width='20px' height='20px' src={Done} alt="" />}
                        </div>
                    </div>
                    <div className="task_delete">
                        <img width='20px' height='20px' src={Trash} alt="" />
                    </div>
                </div>
            </div>
        </li>
    )
}




export default Task;