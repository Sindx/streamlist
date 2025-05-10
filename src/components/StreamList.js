import React, { useState } from 'react';

function StreamList() {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Input:", input);
    setInput('');
  };

  return (
    <div className="streamlist">
      <h2>StreamList</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter a movie or show" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default StreamList;
