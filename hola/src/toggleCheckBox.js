
import React, { useState} from "react";

function ChildComponent({isChecked}) {
    return (
        <div>
            <h2>Child componenet</h2>

            <label>
                <input 
                type = 'checkbox' checked={isChecked}
                readOnly />
                Checkbox Status
            </label>
        </div>
    )
}

function ParentComponent() {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckBox = () => {
        setIsChecked(!isChecked);
    }

    return (
        <div>
            <h1>Parent Component</h1>
        <button onClick={toggleCheckBox}> Toggle Checkbox</button>
       <ChildComponent isChecked={isChecked}/>

        </div>

    )
}

export default ParentComponent;