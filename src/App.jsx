import { useState, useEffect, useRef } from 'react'
import BackgroundComponent from './components/BackgroundComponent'
import EditForm from './components/EditForm'
import StatusContainerDesktop from './components/StatusContainerDesktop'
import StatusContainerMobile from './components/StatusContainerMobile'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import useLocalStorage from './hooks/useLocalStorage'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';


function App() {
  //ვქმით ტასკების ერეის სთეითს, სადაც თასქები ერეია ხოლო setTasks ფუქცია რომელიც მას ააფდეითებს
  const [tasks, setTasks] = useLocalStorage('todo.tasks', [])
  const [taskAmount, setTaskAmount] = useState(tasks.length)
  const [editedTask, setEditedTask] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentFilter, setCurrentFilter] = useState()
  const dragItem = useRef()
  const dragOverItem = useRef()

  //ლისტის კომპონენტების გადასაადგილებდად ძალიან კარგი წყარო: https://rootstack.com/en/blog/how-do-i-use-drag-and-drop-react
  const dragStart = (e, position) => {
    dragItem.current = position
  }
  const dragEnter = (e, position) => {
    dragOverItem.current = position
  }
  const drop = (e) => {
    var temporaryTasksReorder = [...tasks]
    const dragItemContent = temporaryTasksReorder[dragItem.current]
    temporaryTasksReorder.splice(dragItem.current, 1)
    temporaryTasksReorder.splice(dragOverItem.current,0,dragItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setTasks(temporaryTasksReorder)
  }

  const toggleDarkMode = () =>{
    setDarkMode(!darkMode)
  }
 
  const addTask = (task) => {
    //გვინდა, რომ ამ ფუნქციამ მიღებული თასქი ჩვენს ერეის დაუმატოს, ამიტომ გამოვიყენებთ ჩვენს setTasks-ს. აფდეითის ფუნქცია (აქ seTTasks) თავიდან ყოველთვის წინანდელ state-ს იღებს, ამ შემთხვევაში ჩვენ მას pverState დავარქვათ. შემდეგ მივაწოდებთ array-ს დაშლილი სახით (...) და ,-ით ახალ თასქს დასამატებლად
    setTasks(prevState => [...prevState, task])
  }

  useEffect(() => {
    const clone = tasks.slice()
    let temporaryLength = clone.filter(t => !t.checked).length
    setTaskAmount(temporaryLength)
  }, [tasks]);

  const deleteTask = (id) => {
    let clone = tasks.slice()
    let temporaryTasks = clone.filter(t => t.id !== id)
    setTasks(temporaryTasks)
  }
  const deleteComplete = () => {
    let temporaryTasks = tasks.filter(t => !t.checked)
    setTasks(temporaryTasks)
  }
  //იმისთვის, რომ დაჩეკილის სტატუსი აპის სთეითშივე შევცვალოთ, აუცილებელია გვქონდეს ფინქცია რომელსაც მთავარი აპიდან ლისტის აითემამდე გადავიტანთ. აქ ავიღებთ ძველ სთეითს და დავმაპავთ რათა ვიპოვოთ ტასკი რომელსაც იგივე id აქვს, შემდეგ კი სპრედ ოპერატორით ვირჩევთ ამ თასქის ჩექ სტატუსს და მის საპირისპიროს ვაყენებთ, თუ id არ ემთხვევა უბრალოდ ტასკს ვაბრუნებთ უკან. 
  const toggleCheckmark = (id) => {
    let temporaryTasks = tasks.map(task => task.id == id?{...task, checked: !task.checked}:task)
    setTasks(temporaryTasks)
  }

  const updateTask = (task) => {
    let temporaryTasks = tasks.map(t => t.id == task.id?{...task, name: task.name}:t)
    setTasks(temporaryTasks)
    closeEdit()
  }

  const handleFilterClick = (action) => {
    setCurrentFilter(action)
  }

  const enterEdit = (task) => {
    setEditedTask(task)
    setIsEditing(true)
  }
  const closeEdit = () => {
    setIsEditing(false)
  }


  let currentScreen = window.innerWidth


  return (
    <div className={darkMode? "app dark-mode" : "app"} >
      <div className="app-background"></div>
      <BackgroundComponent/>
      {
        isEditing?(<EditForm
                  editedTask={editedTask}
                  updateTask={updateTask}
                  closeEdit={closeEdit}
                  />) : ""
      }
      <div className="app-container">

        <div className="label-div">
          <h1 className="logo">TODO</h1>
          {darkMode? <SunIcon className="theme-image" onClick={toggleDarkMode}/> : <MoonIcon className="theme-image" onClick={toggleDarkMode}/>}
        </div>

        <TaskForm addTask={addTask}/>
        <div className="tasks-container">
          {/* პირველ რიგში უნდა შევამოწმოთ გვაქვს თუ არა თასქები და მხოლოდ შემდეგ დავამატოთ ისინი დომში, ამისთვის ვიყენებთ && ოპერატორს. შემდეგ კი უნდა გავატანოთ ჩვენი თასქები პროფსებად  რომ პირდაპირ მათ სთეითთან ჰქონდეთ წვდომა*/}
          {tasks? <TaskList
           tasks={tasks}
           deleteTask={deleteTask}
           enterEdit={enterEdit}
           toggleCheckmark={toggleCheckmark}
           currentFilter={currentFilter}
           dragStart = {dragStart}
           dragEnter = {dragEnter}
           drop = {drop}
          
          /> : ""}  
        </div>

        {
          currentScreen > 650? <StatusContainerDesktop taskAmount={taskAmount} handleFilterClick={handleFilterClick} deleteComplete={deleteComplete} /> : <StatusContainerMobile taskAmount={taskAmount} handleFilterClick={handleFilterClick} deleteComplete={deleteComplete}/>
        }

        <div class="hint">
          <h4>hint: you can drag tasks to reorder</h4>
        </div>

      </div>
    </div>
  )
}

export default App
