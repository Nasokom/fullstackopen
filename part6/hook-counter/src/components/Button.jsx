import { useCounterContext } from "../contexts/CounterContext"

const Button = ({ type, label }) => {

    const {counterDispatch} = useCounterContext()
  return (
    <button onClick={() => counterDispatch({ type })}>
      {label}
    </button>
  )
}

export default Button