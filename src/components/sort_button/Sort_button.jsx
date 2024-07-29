function SortButton(props) {

    function changeTaskStatus () {
        props.changeTaskStatus(props.type.value)
    }

    return (
        <button onClick={()=>{
            changeTaskStatus('ALL')
          }} style={{'backgroundColor':props.type.color, 'border-width' :props.type.active?'1px':'0px'}} className='sort_button'>{props.type.value}</button>
    )
}

export default SortButton