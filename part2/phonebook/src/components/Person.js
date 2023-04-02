import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
    </div>
  )
}

export default Person
