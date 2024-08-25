import './App.css'
import React from 'react'
import { useState } from 'react'

const Count = ({ count, setCount }) => {
  const Increment = () => {
    setCount(valor => valor + 1)
  }
  const Decrement = () => {
    setCount(valor => valor - 1)
  }
  return (
    <div className='section-container'>
      <div>
        <h1>CONTADOR</h1>
        <h2>{count}</h2>
        <button onClick={Decrement} disabled={count === 0}>-</button>
        <button onClick={Increment} disabled={count >= 10}>+</button>
      </div>
    </div>
  )
}

const ShowText = ({ className, textContent, setVisible }) => {
  const visibleToogle = () => {
    setVisible(prevVisible => !prevVisible);
  }
  return (
    <div className='section-container'>
      <div>
        <h1>OCULTAR TEXTO</h1>
        <h2 className={className}>Ahora me ves</h2>
        <button onClick={visibleToogle}>{textContent}</button>
      </div>
    </div>
  )
}

const ListTasks = ()=> {
  
}

function App() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [task, setTask] = useState([]);
  const [valueInput, setValueInput] = useState('');
  const className = `${visible ? 'visible' : 'hidden'} `
  const textContent = `${visible ? 'Ocultar texto' : 'Mostrar texto'}`

  const handleInputChange = (event) => {
    const newValueInput = event.target.value
    setValueInput(newValueInput)
    console.log(newValueInput)
  }
  const handleClick = () => {
    const newTask = [...task, valueInput]
    if (valueInput !== '') {
      setTask(newTask)
    }
    console.log(newTask)
    setValueInput('')
  }
  const handleClickRemove = (index) => {
    const newTask = task.filter((_, i) => i !== index)
    setTask(newTask)
  }

  return (
    <>
      <Count count={count} setCount={setCount}></Count>
      <ShowText className={className} textContent={textContent} setVisible={setVisible}></ShowText>
      <div className='section-container'>
        <div>
          <h1>Lista de Tareas</h1>
          <div>
            <input type="text" value={valueInput} onChange={handleInputChange} placeholder='Escribe la tarea...' />
            <button onClick={handleClick}>Añadir</button>
          </div>
          <div>
            <ul className='container-list'>
              {task.map((tarea, index) => (
                <div key={index} className='container-element'>
                  <li>{tarea}</li>
                  <input type="checkbox" />
                  <button onClick={() => handleClickRemove(index)}>Eliminar</button>
                </div>
              )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
