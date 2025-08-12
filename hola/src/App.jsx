import React, { useState } from 'react';

// Parent Component
function ParentComponent() {
  const [dataFromChild, setDataFromChild] = useState('');

  // Define the callback function in the parent
  const handleChildData = (data) => {
    setDataFromChild(data);
    // console.log('Data received from child:', data); // This line is for debugging and appears in the console.
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Data from child: **{dataFromChild}**</p>
      {/* Pass the callback function as a prop */}
      <ChildComponent onChildData={handleChildData} />
    </div>
  );
}

// Child Component
function ChildComponent({ onChildData }) {
  const childData = 'Hello from the child!';

  const handleClick = () => {
    // Call the function and pass data up
    onChildData(childData);
  };

  return (
    <div>
      <h3>Child Component</h3>
      <button onClick={handleClick}>Send Data to Parent</button>
    </div>
  );
}

export default ParentComponent;