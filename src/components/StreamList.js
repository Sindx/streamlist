import React, { useState } from "react";
import "./StreamList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function StreamList() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  // Add item to list
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setList([...list, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  // Delete item from list
  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  // Mark item as complete
  const handleComplete = (id) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Edit item
  const handleEdit = (id) => {
    const itemToEdit = list.find((item) => item.id === id);
    setIsEditing(id);
    setEditText(itemToEdit.text);
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    setList(
      list.map((item) =>
        item.id === id ? { ...item, text: editText } : item
      )
    );
    setIsEditing(null);
    setEditText("");
  };

  return (
    <div className="stream-list">
      <h2>Your Stream List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a movie or show"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {list.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            {isEditing === item.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, item.id)}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button type="submit">Update</button>
              </form>
            ) : (
              <>
                {item.text}
                <button onClick={() => handleComplete(item.id)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button onClick={() => handleEdit(item.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
