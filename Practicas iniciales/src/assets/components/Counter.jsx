export const Count = ({ count, setCount }) => {
    const Increment = () => {
      setCount(valor => valor + 1)
    }
    const Decrement = () => {
      setCount(valor => valor - 1)
    }
    return (
      <div className='section-container'>
        <div className='container-content'>
          <h1>CONTADOR</h1>
          <h2>{count}</h2>
          <button onClick={Decrement} disabled={count === 0}>-</button>
          <button onClick={Increment} disabled={count >= 10}>+</button>
        </div>
      </div>
    )
  }