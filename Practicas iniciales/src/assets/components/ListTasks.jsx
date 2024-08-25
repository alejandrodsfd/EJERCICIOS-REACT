import { useEffect } from 'react'

export const ListTasks = ({ tasks, setTasks, inputValue, setInputValue, taskClassName, taskValueBtn }) => {

    useEffect(() => {
      console.log(tasks); // Se ejecutará cada vez que 'tasks' cambie
    }, [tasks]);
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value)
    }
    const handleAddTask = () => {
      if (inputValue.trim() === '') return;
      const newTask = {
        id: Date.now(), //identificador unico
        name: inputValue,
        complete: false
      }
      const updateTask = [...tasks, newTask]
      setTasks(updateTask)
      setInputValue('')
    }
    const handleRemoveTask = (id) => {
      const taskElement = document.getElementById(id)
      taskElement.classList.add('fade-out-shrink-height')
      setTimeout(() => {
        const newTask = tasks.filter(task => task.id !== id)
        setTasks(newTask)
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
          <div className='header-list'>
            <input type="text" value={inputValue} onChange={handleInputChange} placeholder='Escribe la tarea...' />
            <button onClick={handleAddTask}>Añadir</button>
          </div>
          <div className='container-elements'>
            {
              tasks.map(task => {
                return (
                  <div className={taskClassName(task)} id={task.id} key={task.id} >
                    <h3>{task.name}</h3>
                    <div>
                      <button onClick={()=> handleTaskCompletion(task.id)}>{taskValueBtn(task)}</button>
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