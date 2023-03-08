import React from 'react';
import TaskItem from './TaskItem';


//კომპონენტი პროფსად იღებს დესტრუქტურიზირებულ თასქებს
const TaskList = ({tasks, toggleCheckmark, deleteTask, enterEdit}) => {
  return (
    <ul className="tasks">
        {//ვმაპავთ გადმოწოდებულ თასქებს და თითოეული მათგანისთვის ვიძახებთ ახალ TaskItem-ს რომელსაც key-დ გადავცემთ ჩვენს id-ს რათა გვქონდეს unique identifier ამის წყალობით ერთი თასქის დააფდეითებისას მთლიანად დომს თავიდან აღარ ჩატვირთავს და მხოლოდ ამ კომპონენტს ჩაასწორებს ვირტუალურ დომში. p.s. ეს arrow fumnction არ არის და ამიტომ არ უნდა { და ( არის საჭირო!
         //გარდა ცალკეული თასქების დარენდერებისა, შეგვიძლია ისინი ისე დავსორტოთ რომ ახალი თასქები უფრო ზემოთ გამოჩნდეს. რადგან ჩვენი id დეითის მიხედვით იწერება მის მიხედვით დავსორტოთ.   
            tasks.sort((a,b)=>b.id -a.id).map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    enterEdit={enterEdit}
                    deleteTask={deleteTask}
                    toggleCheckmark={toggleCheckmark}
                />
            ))
        }

    </ul>
  );
}

export default TaskList;
