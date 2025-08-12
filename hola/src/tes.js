import { useState,useState } from "react";

const UserFetch = () => {

    const [user, setUser] = useState([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/')
        .then(res => res.join())
        .then(data => setUser(data))
    }, [])

    return (
        <div>
            {user.map(user => ( <p key= {user.id} > {user.name}</p>))}
        </div>
    )
}


export default UserFatch;