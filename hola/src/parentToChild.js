import React from 'react';
import './App.css';

// CHILD COMPONENT
// It receives `props` as an argument.
function ChildComponent(props) {
  return (
    <div className="child">
      <h3>Child Component</h3>
      {/* 2. Access the data using props.message */}
      <p>The message from parent is: <strong>{props.message}</strong></p>
    </div>
  );
}


// PARENT COMPONENT
function App() {
  const messageToSend = "Hello from the Parent Component! 👋";

  return (
    <div className="App">
      <header className="App-header">
        <h1>Parent Component</h1>
        <hr />
        {/* 1. Pass the data as a prop named `message` */}
        <ChildComponent message={messageToSend} />
      </header>
    </div>
  );
}

export default App;