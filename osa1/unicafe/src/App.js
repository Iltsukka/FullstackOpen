import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Average = ({good,neutral,bad,total}) => <div> average {(good*1+neutral*0+bad*(-1))/total}</div>
  


const Positive = (props) => <div>positive {(props.positive/props.total)*100} %</div>
  


const Statistics = ({good,neutral,bad,total}) =>{
  if (total===0) {
    return(
      <div> No feedback given</div>
    )
  }
  return(
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {total}</div>
      <Average good={good} neutral={neutral} bad={bad} total={total} />
      <Positive positive={good} total={total} />
    </div>
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
