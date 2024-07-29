import Editor from './edit_defoult.png'

import SortButton from "../sort_button/Sort_button";

import './task.scss'
import Trash from './trash.png'

function Task(props) {

    function changeEditorStatus () {
        props.changeEditorStatus(props.task.id)
    }

    function deleteTask() {
        props.deleteTask(props.task.id)
    }

    function changeTaskStatus (value) {
        props.changeTaskStatus({...props.task, statusTask : value})
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
                <div  className='show_description'>{props.task.description}</div>
                </div>
            </div>
            <div className="footer_task">
                <div className="status_task">
                    <SortButton changeTaskStatus={changeTaskStatus} type={{
                        color: 'rgb(2, 76, 12)',
                        active: props.task.statusTask==='DONE',
                        value: 'DONE'
                    }} />
                    <SortButton changeTaskStatus={changeTaskStatus} type={{
                        color: 'rgb(146, 28, 28)',
                        active: props.task.statusTask==='NOT READY',
                        value: 'NOT READY'
                    }} />
                </div>
                <div className="task_delete">
                        <img onClick={deleteTask} width='30px' height='30px' src={Trash} alt="" />
                </div>
                <div className="task_edit">
                        <img onClick={changeEditorStatus} width='30px' height='30px' src={Editor} alt="" />
                </div>
            </div>
        </li>
    )
}




export default Task;