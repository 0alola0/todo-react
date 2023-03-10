import React from 'react';
import TaskItem from './TaskItem';


//კომპონენტი პროფსად იღებს დესტრუქტურიზირებულ თასქებს
const TaskList = ({tasks, toggleCheckmark, deleteTask, enterEdit, currentFilter, dragEnter, dragStart, drop}) => {
  return (
    <ul className="tasks">
        {//ვმაპავთ გადმოწოდებულ თასქებს და თითოეული მათგანისთვის ვიძახებთ ახალ TaskItem-ს რომელსაც key-დ გადავცემთ ჩვენს id-ს რათა გვქონდეს unique identifier ამის წყალობით ერთი თასქის დააფდეითებისას მთლიანად დომს თავიდან აღარ ჩატვირთავს და მხოლოდ ამ კომპონენტს ჩაასწორებს ვირტუალურ დომში. p.s. ეს arrow fumnction არ არის და ამიტომ არ უნდა { და ( არის საჭირო!
         //გარდა ცალკეული თასქების დარენდერებისა, შეგვიძლია ისინი ისე დავსორტოთ რომ ახალი თასქები უფრო ზემოთ გამოჩნდეს. რადგან ჩვენი id დეითის მიხედვით იწერება მის მიხედვით დავსორტოთ.   
            tasks.filter(t => t.checked != currentFilter).map((task, index) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    enterEdit={enterEdit}
                    deleteTask={deleteTask}
                    toggleCheckmark={toggleCheckmark}
                    index={index}
                    dragStart = {dragStart}
                    dragEnter = {dragEnter}
                    drop = {drop}
                />
            ))
        }
    </ul>
  );
}

export default TaskList;
