import { useState } from "react";

const App = () => {

    const msg = "hellooooo"

    return(
        <div>
            <h1>parent</h1>
            <ChildComponent message={msg} />
        </div>
    )
}


function ChildComponent(props) {
    return (
        <div>
            <h1>child here</h1>
            <p> msg from parent :: {props.message}</p>
        </div>
    )
}

export default App;