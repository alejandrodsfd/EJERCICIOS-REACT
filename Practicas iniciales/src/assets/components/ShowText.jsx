export const ShowText = ({ className, textContent, setVisible }) => {
    const visibleToogle = () => {
      setVisible(prevVisible => !prevVisible);
    }
    return (
      <div className='section-container'>
        <div className='container-content'>
          <h1>OCULTAR TEXTO</h1>
          <h2 className={className}>Ahora me ves</h2>
          <button onClick={visibleToogle}>{textContent}</button>
        </div>
      </div>
    )
  }