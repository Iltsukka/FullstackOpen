import { useState } from 'react'

const DisplayNames = ({person}) => {
  
  return(
    <li>{person.name} {person.number}</li>
  )

}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0100100' },
    { name: 'John Stones', number: '123456'},
    { name: 'Harry Potter', number: '148904'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  
  const addNote = (event) => {    
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert('Text-fields cannot be empty')
      return
    }

    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    } 
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  
  const handleNameChange = (event) => {    
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilteredChange = (event) => {
    setFiltered(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      filter items on name: <input value={filtered} onChange={handleFilteredChange}/>
      <h2>Add a new</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <DisplayNames key={person.number} person={person} />
          )}
        
      </ul>
      
    </div>
  )

}

export default App
