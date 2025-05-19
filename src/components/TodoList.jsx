import { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const newTaskObj = {
      id: Date.now(), // Using timestamp as a simple unique ID
      text: newTask,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  // Toggle task completion status
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { 
        ...task, 
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      } : task
    ));
  };

  // Delete a task
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  // Format date to a readable string
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="todo-container">
      <h2>Task Management</h2>
      
      <div className="todo-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      
      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Tasks
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Pending
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <div className="task-details">
                  <span className="task-text">{task.text}</span>
                  <span className="task-date">
                    {task.completed 
                      ? `Completed: ${formatDate(task.completedAt)}` 
                      : `Created: ${formatDate(task.createdAt)}`}
                  </span>
                </div>
              </div>
              <button 
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
                title="Delete task"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="empty-list">No tasks found</li>
        )}
      </ul>
      
      <div className="task-stats">
        <p>{tasks.filter(task => !task.completed).length} pending tasks</p>
      </div>
    </div>
  );
};

export default TodoList;