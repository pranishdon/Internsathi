import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import axios from 'axios';
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/tasks")
      .then(res => {
        setTasks(res.data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
        setError("Error fetching tasks. Please try again later."); // Set error state on request failure
      });
  }, []);
  
  const addTask = (data) => {
    axios.post("http://127.0.0.1:8000/tasks", data, {
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if required
      }
    })
    .then(res => {
      // Assuming the response contains the newly created task data
      setTasks([...tasks, res.data]);
    })
    .catch(error => {
      console.error("Error adding task:", error);
      setError("Error adding task. Please try again later.");
    });
  }
  


  const delTask = (id) => {
    // Send DELETE request to API endpoint
    axios.delete(`http://127.0.0.1:8000/tasks/${id}/`)
      .then(() => {
        // If the request is successful, update the front-end state
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error("Error deleting task:", error);
        setError("Error deleting task. Please try again later.");
      });
  }
  

  const updateTask = (e, id, text) => {
    e.preventDefault();
    const task = tasks[id];
    const updatedTask = { ...task, task: text, status: "Active" };
  
    // Send PATCH request to API endpoint
    axios.patch(`http://127.0.0.1:8000/tasks/${id}/`, updatedTask)
      .then(res => {
        // If the request is successful, update the front-end state
        setTasks(tasks.map(t => (t.id === id ? res.data : t)));
      })
      .catch(error => {
        console.error("Error updating task:", error);
        setError("Error updating task. Please try again later.");
      });
  }

  
  const completeTask = async (e, id, task) => {
    try {
      const isChecked = e.target.checked;
    
      // Update local state
      const updatedTasks = tasks.map(t => (t.id === id ? { ...t, completed: isChecked } : t));
      setTasks(updatedTasks);
    
      // Update backend data
      const updatedTask = { ...task, completed: isChecked };
      await axios.patch(`http://127.0.0.1:8000/tasks/${id}/`, updatedTask);
    
      // Update local storage
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error updating task status:', error);
      // Revert the front-end state if the backend update fails
      const updatedTasks = tasks.map(t => (t.id === id ? { ...t, completed: !task.completed } : t));
      setTasks(updatedTasks);
    }
  };
  
  // const completeTask = (e, id ,Task) => {

  //   if (e.target.checked){
  //     console.log("okay")
  //     setTasks(tasks.map(tasks => tasks.id == id? { ...task,completed:true}:task))
  //     const updateTask ={...task, completed:true}
  //     axios.patch("http://127.0.0.1:8000/tasks/" +id,updatedTask)

  //   }
  //   else{
  //     console.log("omo")
  //     setTasks(tasks.map(tasks => tasks.id == id? { ...task,completed:false}:task))
  //     const updateTask ={ ...Task, completed:false}
  //     axios.patch("http://127.0.0.1:8000/tasks/" +id, updatedTask)

     

  //   }

  // }

  //   const isChecked = e.target.checked; 
  //   const updatedStatus = isChecked ? "completed" : "Active";
  
  //   // Send PATCH request to update the status
  //   axios.patch(`http://127.0.0.1:8000/tasks/${id}/`, { status: updatedStatus })
  //     .then(res => {
  //       // If the request is successful, update the front-end state
  //       setTasks(tasks.map(task => (task.id === id ? { ...task, status: updatedStatus } : task)));
  //     })
  //     .catch(error => {
  //       console.error("Error updating task status:", error);
  //       setError("Error updating task status. Please try again later.");
  //     });
  // }
  const filterTask = (cat_value) => {
    axios.get(`http://127.0.0.1:8000/tasks/?status=${cat_value}`)
      .then(res => {
        console.log("Filtered tasks data:", res.data); // Check the data received from the API
        setTasks(res.data); // Verify if setTasks is updating the state correctly
      })
      .catch(error => {
        console.error("Error fetching filtered tasks:", error);
        setError("Error fetching filtered tasks. Please try again later.");
      });
  };
  
  

return (
  <div className="todo-container">
    {error && <p>{error}</p>}
    <Search addTask={addTask} />
    <Filter filter_task={filterTask} />
    <TaskList tasks={tasks} delTask={delTask} update_task={updateTask} complete_task={completeTask} filter_task={filterTask} />
  </div>
);
}

export default App;