import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { Count } from './assets/components/Counter'
import { ShowText } from './assets/components/ShowText'

const ListTasks = ({ tasks, setTasks, toggleModal, handleEditTask }) => {

  useEffect(() => {
    console.log(tasks); // Se ejecutará cada vez que 'tasks' cambie
  }, [tasks]);
  
  const handleRemoveTask = (id) => {
    const newTask = tasks.map(task => task.id === id ? {...task, removing: true} : task)
    setTasks(newTask)
    setTimeout(() => {
      const filteredTask = tasks.filter(task => task.id !== id)
      setTasks(filteredTask)
      window.localStorage.setItem('tasks', JSON.stringify(filteredTask))
    }, 500);
  }
  const handleTaskCompletion = (id) => {
    const updateTask = tasks.map(task => id === task.id ?{...task, complete: !task.complete} : task)
    setTasks(updateTask)
    window.localStorage.setItem('tasks', JSON.stringify(updateTask))
  }

  const getTaskClassName = (task)=> {
    return `container-element ${task.complete ? 'completed' : 'incomplete'}`;
  }
  const getTaskButtonText = (task)=> {
    return `${task.complete ? 'Desmarcar' : 'Completar'}`;
  }

  return (
    <div className='section-container'>
      <div className='container-content'>
        <h1>Lista de Tareas</h1>
        <button className='btn-Agregar' onClick={toggleModal}>Agregar tarea</button>
        <div className='container-elements'>
          {tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              onTaskCompletion={handleTaskCompletion}
              onRemoveTask={handleRemoveTask}
              taskClassName={getTaskClassName(task)}
              taskButtonText = {getTaskButtonText(task)}
              onEditTask = {handleEditTask}
          />
          ))}
        </div>


      </div>
    </div>
  )
}

const TaskItem = ({task, onTaskCompletion, onRemoveTask, taskClassName, taskButtonText, onEditTask}) => (
    <div className={`${taskClassName} ${task.removing ? 'fade-out-shrink-height' : ''}` } id={task.id} >
      <div className='container-heders'>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
      </div>
      <div>
        <button onClick={()=> onTaskCompletion(task.id)}>{taskButtonText}</button>
        <button onClick={()=> onEditTask(task.id)}>Editar</button>
        <button onClick={()=> onRemoveTask(task.id)}>Eliminar</button>
      </div>
    </div>
  )


const Modal = ({showModal, taskName, setTaskName, taskDescription, setTaskDescription, handleAddTask, closeModal, isEditing}) => {
  if(!showModal) return null;
  return(
    <>
    <div className="modal">
      <div className='modal-content'>
        <button className='btn-exit' onClick={closeModal}>X</button>
          <h2>{isEditing ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
          <div className='container-inputs'>
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='Escribe la tarea...' />
            <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Escribe la descripción..." rows={3}/>
          </div>
          <button onClick={handleAddTask}>{isEditing ? 'Guardar Cambios' : 'Crear tarea'}</button>
      </div>
    </div>
      
    </>
    
  )
}


function App() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [tasks, setTasks] = useState(() => {
    const tasksFromStorage = window.localStorage.getItem('tasks')
    return tasksFromStorage ? JSON.parse(tasksFromStorage) : [] 
  });
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [showModal, setShowModal] = useState(false)

  const [editingTaskId, setEditingTaskId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const className = `${visible ? 'visible' : 'hidden'} `
  const textContent = `${visible ? 'Ocultar texto' : 'Mostrar texto'}`

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task)=> task.id === id)
    setTaskName(taskToEdit.name);
    setTaskDescription(taskToEdit.description);
    setEditingTaskId(id);
    setIsEditing(true);
    setShowModal(true);
  }

  const handleAddOrUpdateTask= () =>{
    if (taskName.trim() === '') return;
    if (isEditing){
      const updatedTasks = tasks.map((task)=> 
        task.id === editingTaskId ? {...task, name: taskName, description: taskDescription} : task);
      setTasks(updatedTasks)
      window.localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    }else{
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        complete: false,
      }
      const updatedTask = [...tasks, newTask]
      setTasks(updatedTask)
      window.localStorage.setItem('tasks', JSON.stringify(updatedTask))
    }
    setTaskName('');
    setTaskDescription('');
    setEditingTaskId(null);
    setIsEditing(false);
    setShowModal(false);
  }

  const toggleModal = () => {
    setIsEditing(false)
    setShowModal(!showModal)
  }

  const closeModal = ()=> {
    setShowModal(false);
    setTaskName('');
    setTaskDescription('');
    setEditingTaskId(null);
    setIsEditing(false);
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
        toggleModal={toggleModal}
        handleEditTask = {handleEditTask}
        />
      <Modal
        showModal={showModal}
        taskName={taskName}
        setTaskName={setTaskName}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        handleAddTask={handleAddOrUpdateTask}
        closeModal={closeModal}
        isEditing={isEditing}
      />
    </>
  )
}

export default App
