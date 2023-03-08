import { useState } from 'react'
import BackgroundComponent from './components/BackgroundComponent'
import EditForm from './components/EditForm'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  //ვქმით ტასკების ერეის სთეითს, სადაც თასქები ერეია ხოლო setTasks ფუქცია რომელიც მას ააფდეითებს
  const [tasks, setTasks] = useState([])
  const [editedTask, setEditedTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)


 
  var currentTheme = "./src/assets/icon-sun.svg"
  const addTask = (task) => {
    //გვინდა, რომ ამ ფუნქციამ მიღებული თასქი ჩვენს ერეის დაუმატოს, ამიტომ გამოვიყენებთ ჩვენს setTasks-ს. აფდეითის ფუნქცია (აქ seTTasks) თავიდან ყოველთვის წინანდელ state-ს იღებს, ამ შემთხვევაში ჩვენ მას pverState დავარქვათ. შემდეგ მივაწოდებთ array-ს დაშლილი სახით (...) და ,-ით ახალ თასქს დასამატებლად
    setTasks(prevState => [...prevState, task])
    console.log(task)
  }
  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(task => task.id !== id))
  }
  //იმისთვის, რომ დაჩეკილის სტატუსი აპის სთეითშივე შევცვალოთ, აუცილებელია გვქონდეს ფინქცია რომელსაც მთავარი აპიდან ლისტის აითემამდე გადავიტანთ. აქ ავიღებთ ძველ სთეითს და დავმაპავთ რათა ვიპოვოთ ტასკი რომელსაც იგივე id აქვს, შემდეგ კი სპრედ ოპერატორით ვირჩევთ ამ თასქის ჩექ სტატუსს და მის საპირისპიროს ვაყენებთ, თუ id არ ემთხვევა უბრალოდ ტასკს ვაბრუნებთ უკან. 
  const toggleCheckmark = (id) => {
    setTasks(prevState => prevState.map(task => task.id == id?{...task, checked: !task.checked}:task))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => t.id == task.id?{...task, name: task.name}:t))
    closeEdit()
  }

  const enterEdit = (task) => {
    setEditedTask(task)
    setIsEditing(true)
  }
  const closeEdit = () => {
    setIsEditing(false)
  }


  return (
    <div className="App">
      <BackgroundComponent/>
      <div className="app-container">

        <div className="label-div">
          <h1 className="logo">TODO</h1>
          <img src={currentTheme} alt="theme-icon" className="teme-image" />
        </div>
        {
          isEditing&&(<EditForm
                    editedTask={editedTask}
                    updateTask={updateTask}
                    />)
        }

        <TaskForm addTask={addTask}/>
        <div className="tasks-container">
          {/* პირველ რიგში უნდა შევამოწმოთ გვაქვს თუ არა თასქები და მხოლოდ შემდეგ დავამატოთ ისინი დომში, ამისთვის ვიყენებთ && ოპერატორს. შემდეგ კი უნდა გავატანოთ ჩვენი თასქები პროფსებად  რომ პირდაპირ მათ სთეითთან ჰქონდეთ წვდომა*/}
          {tasks && <TaskList
           tasks={tasks}
           deleteTask={deleteTask}
           enterEdit={enterEdit}
           toggleCheckmark={toggleCheckmark}
          
          />}  
        </div>


      </div>
    </div>
  )
}

export default App
