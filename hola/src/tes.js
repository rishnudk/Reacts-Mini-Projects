import { useState } from "react";

function ParentComponenet() {
    const [dataFromChild, setDataFromChild] = useState('')

    const handleChildData = (data) => {
        setDataFromChild(data);
    }

    return (
        <div>
            <p> Data from child {dataFromChild} </p>
            <Chi
        </div>
    )
}