import { useState, useEffect } from "react";

const UserFetch = () => {

    const [user, setUser] = useState([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/')
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.log('error')
        )
    }, [])

    return (
        <div>
            {user.map(user => ( <p key= {user.id} > {user.name}</p>))}
        </div>
    )
}
 

export default UserFetch;