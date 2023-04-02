import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Message from './components/Message'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState({
    msg: null,
    code: '',
  })

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterName(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = {
          ...existingPerson,
          number: newNumber,
        }

        phonebookService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setMessage({
              msg: `Updated ${newName}'s number`,
              code: 'success',
            })
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setMessage({
                msg: null,
                code: '',
              })
            }, 5000)
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
          })
          .catch((error) => {
            setMessage({
              msg: `${newName} has already been removed from server`,
              code: 'failure',
            })
            setTimeout(() => {
              setMessage({ msg: null, code: '' })
            }, 5000)
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            )
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      phonebookService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setMessage({
          msg: `Added ${newName}`,
          code: 'success',
        })
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setMessage({
            msg: null,
            code: '',
          })
        }, 5000)
      })
    }
  }

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.remove(id).then((returnedPerson) => {
        setMessage({
          msg: `${name} has been removed from server`,
          code: 'failure',
        })
        setTimeout(() => {
          setMessage({ msg: null, code: '' })
        }, 5000)
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <div>
        Search by name:
        <Filter
          filterName={filterName}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <h2>Add New</h2>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        filterName={filterName}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
