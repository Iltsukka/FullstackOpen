import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({good,neutral,bad,total}) =>{
  if (total===0) {
    return(
      <div> No feedback given</div>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={(good-bad)/total} />
        <StatisticLine text='positive' value={`${(good/total)*100} %`} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  
  
  return(
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  const handleGood = () => {
    setGood(good+1)
    setTotal(total +1)
    
  }
  const handleNeutral = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
  }
  const handleBad = () => {
    setBad(bad+1)
    setTotal(total+1)
  }
  const upperHeaderText = 'give feedback'
  const lowerHeaderText = 'statistics'
  
  


  return (
    <div>
      
      <Header text={upperHeaderText}/>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <Header text={lowerHeaderText} />      
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      
    </div>
  )

}

export default App
