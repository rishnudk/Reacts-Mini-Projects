import React, { useEffect, useState } from 'react'

function UserFetch() {

    const [users,setUser] = useState([])

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users/')
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.error('error in data')
        )
    },[])
    
  return (
    <div>
        {users.map(user => ( <p key={user.id}>{user.name}</p> ))}
    </div>
  ) 
     
}

export default UserFetch 