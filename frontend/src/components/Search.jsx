import React from 'react';
import { useForm } from 'react-hook-form';
import './Search.css'; // Import the CSS file

const Search = ({ addTask }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  return (
    <div className="task-search">
      <form
        action=""
        onSubmit={handleSubmit((data) => {
          addTask(data);
          reset();
        })}
      >
        <input
          type="text"
          id="task"
          placeholder="Enter Task"
          {...register("task", { required: true })}
        />
        <textarea
          id="description"
          placeholder="Enter Description"
          {...register("description")}
        />
        <input
          type="date"
          id="due_date"
          {...register("due_date")}
        />
        <button>Add</button>
      </form>
      {errors.task && errors.task.type === "required" && (
        <small>This field is required</small>
      )}
    </div>
  );
}

export default Search;
