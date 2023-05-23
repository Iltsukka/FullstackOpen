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
    const sum = props.parts.reduce((accumulator, currentValue)=> accumulator + currentValue.exercises,0)
    return (
      <p><strong>Number of exercises {sum}</strong></p>
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

export default Course