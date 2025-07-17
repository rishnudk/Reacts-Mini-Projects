import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Card = ({title}) => {
    const [hasLiked, setHasLiked] = useState(false);

  return ( 
    <div className='card'>
      <h2> {title}</h2>
      <button onClick={() => setHasLiked(true)}>
         {hasLiked ? "Liked": "Like"};
      </button>
    </div>
  )
}

const App = () => {

  return (
    <div>
    <h2>this is functional component</h2>
    <div className='card-container'>
   <Card title="Star Wars"  rating={5} isCool={true}/>
   <Card title="Avatar"/>
   <Card title="Vi-Kings"/>
   </div>
   </div>
  )
}


export default App
