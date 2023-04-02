import React from 'react'
import Person from './Person'

const Persons = ({ filterName, persons, deletePerson }) => {
  const personsToShow =
    filterName === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterName.toLowerCase())
        )
  return (
    <>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      ))}
    </>
  )
}

export default Persons
