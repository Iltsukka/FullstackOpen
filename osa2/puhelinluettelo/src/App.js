import { useState, useEffect } from 'react'
import personService from './services/persons'


const DisplayName = ({person, deleteContact}) => {
  
  return(
    <li>{person.name} {person.number} <button onClick={deleteContact}>delete</button></li>
  )

}

const RenderList = ({personsToShow, deleteContact}) => {
  return(
    <div>
      <h2>Numbers</h2>
     <ul>
      {personsToShow.map(person =>
      <DisplayName key={person.number} person={person} deleteContact={()=>deleteContact(person.id,person.name)}/>
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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [showAll, setShowAll] =useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  },[])

  
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
      alert(`Number ${newNumber} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    } 
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setFiltered('')
        setShowAll(true)
      })
    
    
    
    
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

  const deleteContact = (id, name) => {
    const url = `http://localhost:3001/persons/${id}`
    
    if (window.confirm(`Delete ${name}?`)) {
    console.log('this is my id ' + id)
    personService
      .remove(url)
      .then(response => {
        setPersons(persons.filter(person=> person.id !== id))
      })
    
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterByName filtered={filtered} handleFilteredChange={handleFilteredChange} />
      <FormAddNew addNote={addNote} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <RenderList personsToShow={personsToShow} deleteContact={deleteContact}/>
      
    </div>
  )

}

export default App
