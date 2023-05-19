import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = (props)=> {
  return(
    <div>
      {props.text} {props.value}
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)
  const upperHeaderText = 'give feedback'
  const lowerHeaderText = 'statistics'
  const goodText = 'good'
  const neutralText = 'neutral'
  const badText = 'bad'


  return (
    <div>
      <Header text={upperHeaderText}/>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <Header text={lowerHeaderText} />
      <Statistic text={goodText} value={good} />
      <Statistic text={neutralText} value={neutral} />
      <Statistic text={badText} value={bad}/>
    </div>
  )
}

export default App
