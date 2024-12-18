import {ACTIONS} from "./App"

export default function OperationButton({dispatch,operation}){
    return(
    <button onClick={()=>dispatch({type:ACTIONS.OPERATIONS, payload:{operation}})}>
        {operation}
    </button> 
    )
}