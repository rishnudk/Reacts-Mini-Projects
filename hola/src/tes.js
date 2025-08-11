import React from 'react';
import './App.css'

function App() {
    const messageToSend = 'Hello from parent'

    return (
        <div>
            <header>
                <h1>parent Component</h1>
            </header>

            <ChildComponent message={messageToSend} />
        </div>
    )
}

function ChildComponent(props) {
    return(
        <div>
             <p>the message fromparent : {props.message}</p>
        </div>
    )
}
export default App;