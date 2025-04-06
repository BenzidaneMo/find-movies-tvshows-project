import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <TodoList />
    </>
  )
}

function TodoList() {
    // State to manage the list of todos, input value, editing state, and edited text
    const [todos, setTodos] = useState([]); // Array of todo objects {id, text}
    const [inputValue, setInputValue] = useState(''); // Text in the input field
    const [editTodoId, setEditTodoId] = useState(null); // ID of the todo being edited
    const [editTodoText, setEditTodoText] = useState(''); // Text being edited

    // Function to update the input value as the user types
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Function to add a new todo to the list
    const handleAddTodo = () => {
        // Only add if the input value is not empty after trimming whitespace
        if (inputValue.trim()) {
            // Create a new todo object with a unique ID (using Date.now()) and the input text
            setTodos([...todos, { id: Date.now(), text: inputValue }]);
            // Clear the input field after adding the todo
            setInputValue('');
        }
    };

    // Function to remove a todo from the list
    const handleRemoveTodo = (id) => {
        // Filter out the todo with the specified ID
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Function to start editing a todo
    const handleEditTodo = (todo) => {
        // Set the ID of the todo being edited and the initial text
        setEditTodoId(todo.id);
        setEditTodoText(todo.text);
    };

    // Function to update the text of a todo
    const handleUpdateTodo = (id) => {
        // Map over the todos array and update the text of the todo with the matching ID
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: editTodoText } : todo)));
        // Reset the editing state
        setEditTodoId(null);
        setEditTodoText('');
    };

    return (
        <div>
            {/* Input field for adding new todos */}
            <input type="text" value={inputValue} onChange={handleInputChange} />
            {/* Button to add a new todo */}
            <button onClick={handleAddTodo}>Add Todo</button>
            {/* List of todos */}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {/* Conditional rendering: show input for editing, or text for viewing */}
                        {editTodoId === todo.id ? (
                            <>
                                {/* Input field for editing the todo text */}
                                <input
                                    type="text"
                                    value={editTodoText}
                                    onChange={(e) => setEditTodoText(e.target.value)}
                                />
                                {/* Button to update the todo */}
                                <button onClick={() => handleUpdateTodo(todo.id)}>Update</button>
                                {/* Button to cancel editing */}
                                <button onClick={() => setEditTodoId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {/* Display the todo text */}
                                {todo.text}
                                {/* Button to edit the todo */}
                                <button onClick={() => handleEditTodo(todo)}>Edit</button>
                                {/* Button to remove the todo */}
                                <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {/* Conditional rendering: show message if no todos */}
            {todos.length === 0 && <p>No todos yet!</p>}

            <div>
              <input type="text" value={inputValue} onChange={handleInputChange} />
              <p>Input Value: {inputValue}</p>
            </div>

            <ControlledForm/>
        </div>
    );
}

function ControlledForm() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    alert(`Submitted value: ${inputValue}`);
    // You can perform further actions here (e.g., send data to a server)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App
