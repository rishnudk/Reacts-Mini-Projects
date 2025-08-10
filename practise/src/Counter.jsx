
import React , { useState} from "react";

const Counter = () => {
    const [count , setCount] = useState(0);
    const isOdd = count % 2 !== 0;

    const buttonStyle = {
        backgroundColor: isOdd ? 'green' : 'gray',
        color: 'white' , 

    }

    return (
        <div style= {{ textAlign: 'center', marginTop: '50px'}} >
            <h1>Counter: {count}</h1>
            <div>
            <button style={buttonStyle} onClick={() => setCount(count + 1)}>Increment</button>
            <button style={buttonStyle} onClick={() => setCount(count - 1)}>Decrement</button>
            <button style={buttonStyle} onClick={() => setCount(0)}>Reset</button>
            </div>
            </div>

    )
}

export default Counter;