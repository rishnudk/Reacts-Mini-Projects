
import React,{ useState} from "react";

const BulbToggle = () => {
    const [isOn, setIsOn] = useState(false)

    const toggleBulb = () => {
        setIsOn(prev => !prev);
    }

    const bulbStyle = {
        width: '100px',
        height: '100px',
        backgroundColor: isOn ? 'yellow' : 'gray',
}

return (<div>
    <div style={bulbStyle}></div>
    <button onClick={toggleBulb}>Toggle Bulb</button>
</div>
)
}

export default BulbToggle;