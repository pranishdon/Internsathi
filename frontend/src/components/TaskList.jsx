import React, { useState, useRef } from 'react';  // Import React and other necessary functions
import { AiFillDelete } from 'react-icons/ai';
import { TbEdit } from 'react-icons/tb';

const TaskList = ({ tasks, delTask, update_task, complete_task }) => {
  let taskRef = useRef(null);
  let [taskId, setTaskId] = useState(0);
  let [toggle, setToggle] = useState(false);
  let [taskValue, setTaskValue] = useState('');

  const taskItem = (task, id) => {
    setTaskId(id);
    setToggle(true);
  };


  return (
    <>
      <div className="Task-list">
        {tasks.map((task, index) => (
          <div className="Task-list-item" key={index}>
            <div className="task">
              <input type="checkbox" onChange={(e) => complete_task(e, task.id)} />
              <p id="t_task" className={task.status === 'Completed' ? 'strike' : ''}>
                {task.task}
              </p>
            </div>
            <div className="btn-container">
              <div className="edit">
                <TbEdit size={25} onClick={() => taskItem(task.task, task.id)} />
              </div>
              <div className="del">
                <AiFillDelete size={25} onClick={() => delTask(task.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {toggle && (
        <div className="modal-container">
          <div className="modal">
            <h1>Update Form</h1>
            <form
              action=""
              onSubmit={(e) => {
                update_task(e, taskId, taskValue);
                setToggle(false);
              }}
            >
              <input
                type="text"
                ref={taskRef}
                placeholder="Update Task"
                value={taskValue}
                onChange={(e) => setTaskValue(e.target.value)}
                required
              />
              <button id="add">Add</button>
            </form>
            <div className="btn-container">
              <button className="cancel mod-btn" onClick={() => setToggle(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
