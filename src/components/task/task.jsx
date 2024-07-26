import {useEffect, useState, useRef} from "react";
import Editor from './edit_defoult.png'

import './task.scss'
import Trash from './trash.png'

function Task(props) {

    console.log(props.task)

    let status = props.active_status_tasks.filter((e) => {
       return e.task_id === props.task.id
    })[0]?.status


    const [edit_status, set_edit_status] = useState (false)
    const [activ_status, set_activ_status] = useState (status)

    const editor = useRef()

    //При изменении статуса активности задачи (который нам приходит из пропсов) , 
    //меняем стейт
    useEffect(()=>{
        set_activ_status(status)
    },[status])


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
        updateTask.description = editor.current.value
        props.editTask(updateTask)
        close_edit()
    }

    function deleteTask() {
        props.deleteTask(props.task.id)
    }

    function getTaskDescription () {
        if (edit_status) {
            return <div className='edit_description'><textarea ref={editor} autoFocus rows='9' className="edit_textarea" name="" id="">{props.task.description}</textarea></div>
        } else {
            return <div  className='show_description'>{props.task.description}</div>
        }
    }

    function changeTaskStatus (value) {
        props.changeTaskStatus({...props.task, status_task : value})
    }


    return (
        <li className="task" >
            <div className='header_task'>
                <div className="task_title">{props.task.title}</div>
                <div className="task_time">{props.task.time}</div>
            </div>
            <div className='task_content' >
                {/* <div style={{'backgroundColor':activ_status?'grey':''}} className="marker"></div> */}
                <div className="task_description">
                    {getTaskDescription()}
                </div>
                {/* <div className="buttons_task">
                    {edit_status&&<div onClick={close_edit} className="close_editor" ><img src={Close} alt="" width='20px' height='20px'/></div>}
                    <div className="task_edit">
                        <div className='edit_icon'>
                            {!edit_status&&<img onClick={start_edit} width='20px' height='20px' src={Edit} alt="" />}
                            {edit_status&&<img onClick={editTask} width='20px' height='20px' src={Done} alt="" />}
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="footer_task">
                <div className="status_task">
                    <button onClick={()=>{
                        changeTaskStatus('DONE')
                    }} 
                    style={{'backgroundColor':'rgb(2, 76, 12)',  borderWidth: props.task.status_task === 'DONE'? '1px':'0px'}} className='sort_button'>DONE</button>
                    <button onClick={()=>{
                        changeTaskStatus('NOT READY')
                    }}
                    style={{'backgroundColor':'rgb(146, 28, 28)',  borderWidth: props.task.status_task === 'DONE'? '0px':'1px'}} className='sort_button'>NOT READY</button>
                </div>
                <div className="task_delete">
                        <img onClick={deleteTask} width='30px' height='30px' src={Trash} alt="" />
                </div>
                <div className="task_edit">
                        <img onClick={change_active_status} width='30px' height='30px' src={Editor} alt="" />
                </div>
            </div>
        </li>
    )
}




export default Task;