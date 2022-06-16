import './App.css';
import { useState, useEffect } from 'react';
import DragDrop from './Components/DragDrop/DragDrop';
import Navbar from './Components/Navbar/Navbar'
import { Container } from '@mui/material';
import Result from './Components/Result/Result';

function App() {
  const [downloadResponse, setdownloadResponse] = useState();
  const [phase, setPhase] = useState('init')


  useEffect(() => {
    if (downloadResponse) {
      console.log(downloadResponse);
      setPhase('result')
    }
  }, [downloadResponse])

  const showContent = () => {
    switch (phase) {
      case "result":
        return <Result downloadResponse={downloadResponse} />;

      case "init":
        return <DragDrop setdownloadResponse={setdownloadResponse} />;

      default:
        <DragDrop setdownloadResponse={setdownloadResponse} />
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        {showContent()}
      </div>
    </div>
  );
}

export default App;
