import React from 'react';
import {useState, useEffect} from 'react';
import {CheckIcon} from '@heroicons/react/24/outline'


//ედითის გასროლისას პირველ რიგში ხდება ის, რომ არჩეულ თასქის მნიშვნელობას იღებს editedTask-ი და იგი ამ form-ს გადაეწოდება. taskItem-ებიდან გავისვრით enteredit-ს და isediting true გახდება
// რაც საშუალებას აძლევს ამ form-ს რომ გამოჩნდეს. ამ კომპონენტშივე გვაქ ლოკალური სთეითი რომელიც ბეჭდვასთან ერთად აფდეითდება, როდესაც ვასაბმითებთ აფდეითს ხდება handleTaskSubmiT, რომელიც პირველ რიგში default დასაბმითებას კრძალავს, რომ აღარ გადაიტვირთოს გვერდი, ხოლო შემდეგ კი
// ააფდეითებს პირვანდელ თასქს udateTask ფუნქციით, რომელსაც გადავაწოდებთ  editedtask-ს და მის სახელს. app-ში უკვე გაწერილია ეს ფუნქცია რომელიც გადაწოდებული თასქის id-ით იპოვის გობალურ თასქებში შესაფერისს და  დაააფთედითებს მის სახელს და ბოლოს editModes false-ად.
const EditForm = ({editedTask, updateTask, closeEdit}) => {
    const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name)

    useEffect(()=>{
        const closeModalOnEsc = (e) => {
            e.key == "Escape"? closeEdit(): ""
        }
        window.addEventListener('keydown', closeModalOnEsc)
        return()=> {
            window.removeEventListener('keydown', closeModalOnEsc)
        }

    }, [closeEdit])

    const handleTaskSubmit = (e) =>{
        e.preventDefault()
        updateTask({...editedTask, name:updatedTaskName})
    }
    
  return (
      <div className="update-wrapper">
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
        <h5 className="close-edit">Press esc to undo and close the window</h5>

      </div>

  );
}

export default EditForm;
