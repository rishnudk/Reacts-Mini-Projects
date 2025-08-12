import { useState } from "react";

const App = () => {

    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1)
    }

    const handleDecrement = () => {
        setCount(count - 1)
    }



    return (
        <div>
            <h1>Counter</h1>
            <p style={{color: count % 2 !== 0 ? 'red'  :'green'}}>{count}</p>


            <div>
                <button onClick={handleIncrement}>Increment</button>

                <butoon onClick={handleDecrement}>Decrement</butoon>
            </div>
        </div>
    )
}

export default App;