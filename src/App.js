import {useReducer} from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButtons";
import "./style.css";

export const ACTIONS={
  ADD_DIGIT:'add_digit',
  OPERATIONS:'operations',
  CLEAR:'clear',
  DELETE:'delete',
  EVALUATION:'evaluation'
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(payload.digit=='0' && state.currentOperand=='0'){
        return state
      }
      
      if(payload.digit=="." && state.currentOperand.includes(".")){
      return state
      }
      if(state.overwrite){
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false
        }
      }
      
      return{
        ...state, 
        currentOperand:`${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.OPERATIONS:
      if(state.previousOperand==null && state.currentOperand==null){
        return state
      }
      if (state.previousOperand==null){
        return{
          ...state,
          operation:payload.operation,
          previousOperand: state.currentOperand,
          currentOperand:null
        }
        
      }
      if (state.currentOperand==null){
        return{
          ...state,
          operation:payload.operation
        }
      }
      return{
        ...state,
        previousOperand:evaluate(state),
        operation:payload.operation,
        currentOperand:null

      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.EVALUATION:
      if(state.previousOperand==null || state.currentOperand==null || state.operation==null){
        return state
      }
      return{
        ...state,
        previousOperand:null,
        operation:null,
        overwrite:true,
        currentOperand:evaluate(state)
      }
    case ACTIONS.DELETE:
      if(state.overwrite){
        return{
          ...state,
          currentOperand:null,
          overwrite:false
        }
      }
      if (state.currentOperand==null)return state
      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }
    
  }


  
}
function evaluate({currentOperand,previousOperand,operation}){
  const prev=parseFloat(previousOperand)
  const current=parseFloat(currentOperand)
  if(isNaN (prev) && isNaN(current))return ""
  let computation=""
  switch(operation){
    case '+':
      computation=prev+current
      break
    case '-':
      computation=prev-current
      break
    case '*':
      computation=prev*current
      break
    case '/':
      computation=prev/current
      break

    
  }

  return computation.toString()
}

function App() {
  const[{currentOperand,previousOperand,operation},dispatch]=useReducer(reducer,{})
  return(
    <div className="calculator-grid">
      <div className="output">
        <div className="previousOperand">{previousOperand}{operation}</div>
        <div className="currentOperand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATION })}>=</button>

    </div>
  )
}

export default App;
