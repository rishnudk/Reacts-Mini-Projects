import React, { useState } from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const Todoitems = ({ text, id, isComplete, deleteTodo, toggle, editTodo, createdAt }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const saveEdit = () => {
    if (newText.trim() !== "") {
      editTodo(id, newText.trim());
      setIsEditing(false);
    }
  };

  const getTimeSince = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diff = Math.floor((now - created) / 1000); // in seconds

    const days = Math.floor(diff / (3600 * 24));
    const hours = Math.floor((diff % (3600 * 24)) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''}, ${hours} hr${hours > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''}, ${minutes} min ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return "just now";
  };

  return (
    <div className='flex items-center my-3 gap-3'>
      <div onClick={() => !isEditing && toggle(id)} className='flex flex-1 items-center cursor-pointer'>
        <img src={isComplete ? tick : not_tick} alt="" className='w-7' />
        {
          isEditing ? (
            <input
              value={newText}
              onChange={e => setNewText(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={e => e.key === "Enter" && saveEdit()}
              autoFocus
              className='border-b border-gray-400 bg-transparent outline-none ml-4 text-sm'
            />
          ) : (
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? "line-through" : ""}`}>{text}</p>
          )
        }
        <small className="text-sm text-gray-500 ml-4">{getTimeSince(createdAt)}</small>
      </div>
      <button onClick={() => setIsEditing(true)}>✏️</button>
      <img onClick={() => deleteTodo(id)} src={delete_icon} alt="" className='w-3.5 cursor-pointer' />
    </div>
  );
};

export default Todoitems;
