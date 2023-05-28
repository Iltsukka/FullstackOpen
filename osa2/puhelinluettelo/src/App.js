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
      <DisplayName key={person.name} person={person} deleteContact={()=>deleteContact(person.id,person.name)}/>
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

const Notification = ({message})=> {
  if (message===null) {
    return null
  }
  
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const ErrorNotification = ({message})=> {
  if (message===null) {
    return null
  }
  
  return (
    <div className='errorNotification'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [showAll, setShowAll] =useState(true)
  const [notification, setNotification]=useState(null)
  const [errorNotify, setErrorNotify]=useState(null)
  

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

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person=>person.name===newName)
        const url = `http://localhost:3001/persons/${personToUpdate.id}`
        const changedNumber = {...personToUpdate, number: newNumber}

        personService
          .update(url, changedNumber)
          .then(response => {
            setPersons(persons.map(person=> person.name !== newName ? person : response.data))
            setNotification(`${personToUpdate.name} was updated`)
            setTimeout(() => {
              setNotification(null)
            }, 5000);
            setNewName('')
            setNewNumber('')
          })
          .catch(error=> {
            setErrorNotify(`${personToUpdate.name} has already been removed from server`)
            setTimeout(() => {
              setErrorNotify(null)
              
            }, 5000);
            
          })
        return

      } else {
        return
      }
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
        setNotification(`${response.name} was added`)
        setTimeout(() => {
          setNotification(null)
          
        }, 5000);
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
    personService
      .remove(url)
      .then(response => {
        setPersons(persons.filter(person=> person.id !== id))
        setNotification(`${name} was deleted`)
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      })
    
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <ErrorNotification message={errorNotify} />
      
      <FilterByName filtered={filtered} handleFilteredChange={handleFilteredChange} />
      
      <FormAddNew addNote={addNote} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <RenderList personsToShow={personsToShow} deleteContact={deleteContact}/>
      
    </div>
  )

}

export default App
