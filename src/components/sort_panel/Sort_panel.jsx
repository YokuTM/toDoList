import SortButton from "../sort_button/Sort_button"
import { useState } from "react";
import { sortTypes } from "../../shared/sort_types";

function SortPanel(props) {

    const [sort_types, set_sort_types] = useState(sortTypes)

    function changeTaskStatus (value) {
        let update_sort_types =  sort_types.map((e)=>{
            if (e.value === value) {
                return {
                    ...e, 
                    active:true
                }
            } else {
                return {
                    ...e, 
                    active:false
                }
            }
        })

        set_sort_types(update_sort_types)

        props.changeSortingTipe(value)
    }

    return (
        <div className='sort_buttons'>
            {sort_types.map((e)=>{
                return <SortButton type={e} changeTaskStatus={changeTaskStatus} />
            })}
    </div>
    )
}


export default SortPanel