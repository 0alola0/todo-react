import React from 'react';
import {useState} from 'react';
import {PlusIcon} from '@heroicons/react/24/outline'

const TaskForm = ({addTask}) => {
    const [task, setTask] = useState("")
    const handleTaskSubmit =(e) =>{
        e.preventDefault()
        addTask({
            name: task,
            checked: false,
            id: Date.now()
        })
        setTask("")
    }
  return (
    <form className="todo" onSubmit={handleTaskSubmit}>
            <button 
            className="submit-task"
            type="submit"
            aria-label="add task" >
            <PlusIcon color="white" strokeWidth={2.50} />
            </button>

            <input 
            type="text" 
            id="task" className="add-task" 
            placeholder="what is it that you must do?" 
            required
            autoFocus
            value={task}
            onInput={(e)=>setTask(e.target.value)}
            />
    </form>
  );
}

export default TaskForm;


