import React, { useState } from 'react';
import './App.css';

// Child Component
function ChildComponent({ onDataFromChild }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    const data = event.target.value;
    setInputValue(data);
    // Call the function passed from the parent with the new data
    onDataFromChild(data);
  };

  return (
    <div className="child">
      <h3>Child Component</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something here..."
      />
    </div>
  );
}


// Parent Component
function App() {
  // State to hold data received from the child
  const [dataFromChild, setDataFromChild] = useState('');

  // 1. A function to handle data from the child
  const handleDataFromChild = (data) => {
    console.log('Data received from child:', data);
    setDataFromChild(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Parent Component</h1>
        <p>Message from Child: <strong>{dataFromChild}</strong></p>
        <hr />
        {/* 2. Pass the function to the child as a prop */}
        <ChildComponent onDataFromChild={handleDataFromChild} />
      </header>
    </div>
  );
}

export default App;