const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Total = ({ parts }) => {
  const exercises = parts.map((part) => part.exercises)
  const sum = exercises.reduce((a, b) => a + b, 0)

  return <p>Number of exercises {sum}</p>
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course