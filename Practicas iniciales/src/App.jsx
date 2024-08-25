import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { Count } from './assets/components/Counter'
import { ShowText } from './assets/components/ShowText'

const ListTasks = ({ tasks, setTasks, handleModal, taskClassName, taskValueBtn,   }) => {

  useEffect(() => {
    console.log(tasks); // Se ejecutará cada vez que 'tasks' cambie
  }, [tasks]);
  
  const handleRemoveTask = (id) => {
    const newTask = tasks.map(task => task.id === id ? {...task, removing: true} : task)
    setTasks(newTask)
    setTimeout(() => {
      const filteredTask = tasks.filter(task => task.id !== id)
      setTasks(filteredTask)
    }, 500);
  }
  const handleTaskCompletion = (id) => {
    const updateTask = tasks.map(task => id === task.id ?{...task, complete: !task.complete} : task)
    setTasks(updateTask)
  }

  return (
    <div className='section-container'>
      <div className='container-content'>
        <h1>Lista de Tareas</h1>
        <button className='btn-Agregar' onClick={handleModal}>Agregar tarea</button>
        <div className='container-elements'>
          {
            tasks.map(task => {
              return (
                <div className={`${taskClassName(task)} ${task.removing ? 'fade-out-shrink-height' : ''}` } id={task.id} key={task.id} >
                  <div className='container-heders'>
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                  </div>
                  <div>
                    <button onClick={()=> handleTaskCompletion(task.id)}>{taskValueBtn(task)}</button>
                    <button >Editar</button>
                    <button onClick={()=> handleRemoveTask(task.id)}>Eliminar</button>
                  </div>
                </div>
              )
            })
          }
        </div>


      </div>
    </div>
  )
}

const Modal = ({showModal, inputValue, setInputValue, inputValueDes, setInputValueDes, handleAddTask, exitModal}) => {
  if(!showModal) return null;
  return(
    <>
    <div className="modal">
      <div className='modal-content'>
        <button className='btn-exit' onClick={exitModal}>X</button>
          <h2>Nueva Tarea</h2>
          <div className='container-inputs'>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Escribe la tarea...' />
            <textarea value={inputValueDes} onChange={(e) => setInputValueDes(e.target.value)} placeholder="Escribe la descripción..." rows={3}/>
          </div>
          <button onClick={handleAddTask}>Crear tarea</button>
      </div>
    </div>
      
    </>
    
  )
}


function App() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('')
  const [inputValueDes, setInputValueDes] = useState('')
  const [showModal, setShowModal] = useState(false)

  const className = `${visible ? 'visible' : 'hidden'} `
  const textContent = `${visible ? 'Ocultar texto' : 'Mostrar texto'}`

  const getTaskClass = (task)=> {
    return `container-element ${task.complete ? 'completed' : 'incomplete'}`;
  }
  const getValueBtn = (task)=> {
    return `${task.complete ? 'Desmarcar' : 'Completar'}`;
  }
  const handleModal = () => {
    setShowModal(!showModal)
  }

  const exitModal = ()=> {
    setShowModal(false)
    setInputValue('')
    setInputValueDes('')
  }

  const handleAddTask = () => {
    if (inputValue.trim() === '') return;
    const newTask = {
      id: Date.now(), //identificador unico
      name: inputValue,
      description: inputValueDes,
      complete: false
    }
    const updateTask = [...tasks, newTask]
    setTasks(updateTask)
    exitModal()
  }
  
  return (
    <>
      <Count 
        count={count} 
        setCount={setCount}/>
      <ShowText 
        className={className} 
        textContent={textContent} 
        setVisible={setVisible}/>
      <ListTasks 
        tasks={tasks} 
        setTasks={setTasks} 
        handleModal={handleModal}
        taskClassName={getTaskClass} 
        taskValueBtn={getValueBtn}
        />
      <Modal
        showModal={showModal}
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputValueDes={inputValueDes}
        setInputValueDes={setInputValueDes}
        handleAddTask={handleAddTask}
        exitModal={exitModal}
      />
    </>
  )
}

export default App
