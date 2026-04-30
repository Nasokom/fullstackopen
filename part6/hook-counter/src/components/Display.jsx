import { useCounterContext } from "../contexts/CounterContext"

const Display = () => {
     const {counter} = useCounterContext()
  return <div>{counter}</div>
}

export default Display