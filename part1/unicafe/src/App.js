import { useState } from 'react'
// a proper place to define a component
const Statistics = ({ good, neutral, bad }) =>
  good + neutral + bad > 0 ? (
    <div>
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={good + neutral + bad} />
      <StatisticsLine
        text='average'
        value={(good * 1 + bad * -1) / (good + neutral + bad)}
      />
      <StatisticsLine
        text='positive'
        value={`${(good / (good + neutral + bad)) * 100} %`}
      />
    </div>
  ) : (
    <p>No Feedback Given</p>
  )

const StatisticsLine = ({ text, value }) => (
  <table>
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  </table>
)

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <br />
      <Button text='good' onClick={() => setGood(good + 1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' onClick={() => setBad(bad + 1)} />
      <br />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
