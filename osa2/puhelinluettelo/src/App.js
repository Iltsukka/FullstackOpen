import { useState } from 'react'

const DisplayName = ({person}) => {
  
  return(
    <li>{person.name} {person.number}</li>
  )

}

const RenderList = ({personsToShow}) => {
  return(
    <div>
      <h2>Numbers</h2>
     <ul>
      {personsToShow.map(person =>
      <DisplayName key={person.number} person={person} />
      )}
      </ul>
    </div>
  )

}

const FormAddNew = ({addNote, handleNameChange, handleNumberChange, newName,newNumber}) => {
  return(
  <div>
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
    </div>
  )
}

const FilterByName = ({filtered, handleFilteredChange}) => {
  return(
    <div>filter items on name: <input value={filtered} onChange={handleFilteredChange}/></div>

  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0100100'},
    { name: 'John Stones', number: '123456'},
    { name: 'Harry Potter', number: '148904'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [showAll, setShowAll] =useState(true)
  
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()))

  
  
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
    setFiltered('')
    setShowAll(true)
    
    
  }

  
  const handleNameChange = (event) => {    
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilteredChange = (event) => {
    setFiltered(event.target.value)    
    setShowAll(false)
    

    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterByName filtered={filtered} handleFilteredChange={handleFilteredChange} />
      <FormAddNew addNote={addNote} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <RenderList personsToShow={personsToShow}/>
      
    </div>
  )

}

export default App
