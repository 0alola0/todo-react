import React from 'react';
import {useState} from 'react';
import {CheckIcon} from '@heroicons/react/24/outline'

const EditForm = ({editedTask, updateTask}) => {
    const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name)

    const handleTaskSubmit = (e) =>{
        e.preventDefault()
        updateTask({...editedTask, name:updatedTaskName})
    }
  return (
      <div className="update-wrapper" 
      //onClick={}
      >
        <form className="todo editor" onSubmit={handleTaskSubmit}>
            <button 
            className="submit-task"
            type="submit"
            aria-label="edit task" >
            <CheckIcon color="white" strokeWidth={2.50} />
            </button>

            <input 
            type="text" 
            id="editTask" className="add-task" 
            placeholder="update task" 
            required
            autoFocus
            value={updatedTaskName}
            onInput={(e)=>setUpdatedTaskName(e.target.value)}
            />
        </form>
      </div>

  );
}

export default EditForm;
