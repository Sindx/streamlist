import React, { useState, useEffect } from 'react';
import './StreamList.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState(() => {
    const stored = localStorage.getItem('streamList');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('streamList', JSON.stringify(list));
  }, [list]);

  const handleAdd = () => {
    if (input.trim()) {
      const newItem = {
        id: Date.now(),
        text: input,
        completed: false
      };
      setList([...list, newItem]);
      setInput('');
    }
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const handleComplete = (id) => {
    setList(list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleEdit = (id) => {
    const newText = prompt('Edit title:');
    if (newText) {
      setList(list.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      ));
    }
  };

  return (
    <div className="streamlist-container">
      <h2>Your Stream List</h2>
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a movie or show"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul className="streamlist-ul">
        {list.map((item) => (
          <li key={item.id} className="streamlist-item">
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
              {item.text}
            </span>
            <div className="action-icons">
              <button onClick={() => handleComplete(item.id)} title="Mark Complete">
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button onClick={() => handleEdit(item.id)} title="Edit Title">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => handleDelete(item.id)} title="Delete">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
