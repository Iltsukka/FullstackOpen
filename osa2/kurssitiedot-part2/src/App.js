const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  
  return (
    <>
      {props.parts.map(course =>
        <Part key={course.id} part={course.name} exercises={course.exercises} />
        )}
    </>
    
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Total = (props) => {
  const sum = props.parts.reduce((accumulator, currentValue)=>accumulator+currentValue.exercises,0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course =  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },

      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      },
     
      {
        name: 'Testing to see if adding a part does not break anything',
        exercises: 0,
        id:4
      }
      
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;


