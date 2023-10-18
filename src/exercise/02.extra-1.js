// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// exercise 2 extra 1 lazy initialization using a function in useState

const readLocalStorageName = initialName =>
  window.localStorage.getItem('name') ?? initialName

function Greeting({initialName = 'Beringar default'}) {
  const [name, setName] = React.useState(() =>
    readLocalStorageName(initialName),
  )

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
