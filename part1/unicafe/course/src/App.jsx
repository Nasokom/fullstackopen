import { useState } from 'react'

const Button =({text,eventHandler})=> <button onClick={eventHandler}>{text}</button>
const StatisticLine =({text,value}) => {

  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr> 
  )

}

const Statistics = (props) => {

  const {good, bad, neutral} = props

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = all > 0 && (good/all)*100 +'%'

if(all> 0){

  return(
      <table>
        <caption>Statistics</caption>
        <tbody>

        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={all}/>
        <StatisticLine text='average' value={average}/>
        <StatisticLine text='positive' value={positive}/>
        </tbody>
      </table>
  )
}
return <p>No feedback given</p>
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <p>Give FeedBack</p>

        <Button text={'good'} eventHandler={()=>setGood(good+1)}/>
        <Button text={'neutral'} eventHandler={()=>setNeutral(neutral+1)}/>
        <Button text={'bad'} eventHandler={()=>setBad(bad+1)}/>

        <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App