import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';


const TaskItem = ({task, toggleCheckmark, deleteTask, enterEdit, dragStart, dragEnter, drop, index}) => {
  const [isChecked, setIsChecked] = useState(task.checked)

  const handleCheckox = (e) => {
    setIsChecked(!isChecked)
    toggleCheckmark(task.id)
  }
  return (
    <li className="task drag" id="draggable" 
    onDragStart={(e) => dragStart(e, index)}
    onDragEnter={(e) => dragEnter(e, index)}
    onDragEnd={drop}
    draggable="true"
    >
        <input checked={isChecked} type="checkbox" className={isChecked? "completor checked" : "completor"}  onChange={handleCheckox}/>
        <label htmlFor={task.id} className="label-container"><span className={isChecked? "custom-checkbox checked" : "custom-checkbox"} onClick={handleCheckox}>{isChecked&&<CheckIcon width={15} height={15}  strokeWidth={3.00}/>}</span>{task.name}</label>
        <button className="delete-single" onClick={() => enterEdit(task)}>
            <PencilSquareIcon  width={26} height={26}/>
        </button>
        {/* ღილაკს ვატანთ წაშლის ფუნქციას რომელიც გადმოვიტანეთ app.jsx-იდან მაგრამ აუცილებლად უნდა იყოს ქოლბექ ფუნქცია, რომ მიხოლოდ დაჭერისას განხორციელდეს */}
        <button className="delete-single" onClick={() => deleteTask(task.id)}>
            <XMarkIcon width={26} height={26}/>
        </button>
    </li>
  );
}

export default TaskItem;
