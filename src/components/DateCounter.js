import { useState, useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(state, action)

  switch(action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step}
    case 'inc':
      return { ...state, count: state.count + state.step}
    case 'setCount':
      return { ...state, count: action.payload}
    case 'setStep':
      return { ...state, step: action.payload}
    case 'reset':
      return initialState
    default:
      throw new Error('Unknown action type')
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  // Instead of useState, we use useReducer...
  const [state, dispatch] = useReducer(reducer, initialState)
  const {count, step} = state

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    // Instead of calling setCount, we dispatch an action...
    dispatch({type: "dec"})
  };
  
  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    // Instead of calling setCount, we dispatch an action...
    dispatch({ type: 'inc' });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    // Instead of calling setCount, we dispatch an action...
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    // Instead of calling setStep, we dispatch an action...
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    // Instead of calling setCount, we dispatch an action...
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
