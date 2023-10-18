// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// exercise 2 extra 3 custom hook

const useLocalStorage = (key, initialValue = '') => {
  const [value, setValue] = React.useState(
    () => window.localStorage.getItem(key) ?? initialValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = 'Beringar default'}) {
  const [value, setValue] = useLocalStorage('name', initialName)

  function handleChange(event) {
    setValue(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={value} onChange={handleChange} id="name" />
      </form>
      {value ? <strong>Hello {value}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)
  return (
    <>
      <button onClick={() => setCount(previousCount => previousCount + 1)}>
        {count}
      </button>
      <Greeting />
    </>
  )
}

export default App
