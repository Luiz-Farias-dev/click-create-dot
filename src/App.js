import { useState } from 'react';
import './App.css';

function App() {
  const [click, setClick] = useState([]);
  const [undid, setUndid] = useState([]);
  const handleClick = (event) => {
    const whereCLicked = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
    setClick((prev)=> [...prev, whereCLicked])
  }

  const handleUndo = () => {
    if(click.length === 0) {
      return;
    }
    const lastItem = click[click.length - 1];
    setUndid((prev) => [...prev, lastItem]);
    setClick((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    })
  }

  const handleRedo = () => {
    if(undid.length === 0) {
      return;
    }
   const lastItem = undid[undid.length - 1];
   setUndid((prev) => {
    const newArr = [...prev].slice(0, -1);
    return newArr;
  })
   setClick((prev) => [...prev, lastItem]);
  }

  return (
    <>
      <button 
        className='btn-undo'
        onClick={handleUndo}
        >
          Desfazer
      </button>
      <button 
        className='btn-redo'
        onClick={handleRedo}
        >
          Refazer
      </button>
      <div className="App" onClick={(e)=>handleClick(e)}>
        {click.map((item, index) => (
          <span key={index} className='dot' style={{left: item.clientX, top: item.clientY}}/>
        ))}
      </div>
    </>
    
  );
}

export default App;
