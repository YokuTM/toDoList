function SortButton(props) {

    function changeSortingTipe () {
        props.changeSortingTipe(props.type.value)
    }

    return (
        <button onClick={()=>{
            changeSortingTipe('ALL')
          }} style={{'backgroundColor':props.type.color, 'border-width' :props.type.active?'1px':'0px'}} className='sort_button'>{props.type.value}</button>
    )
}

export default SortButton