import {useState, useEffect } from 'react';

//localstorage-ში ვაყენებთ ორ hook-ს, სთეითსა და useEffects-ს. useEffect არის ჰუქი, რომელიც გაისვრის ფუნქციას კომპონენტის ყოველ დარენდერებაზე. ელემენტის დარენდერება არა მხოლოდ აპის პირველადი ჩატვირთვისას ხდება, არამედ მისი სთეითის ყოველი ცვლილებისას.
//ამ შემთხვევაში useEffect-ზე მიწოდებული გვაქვს ის ელემენტები, რომელთა ცვლილებაც მითითებულ ფუნქციას განახორციელებს ეს არის key და savedTasks

const useLocalStorage = (key, initialValue) => {

   // ჩვეულებრივი localStorage-ს გამოტანის ფუნქცია, try/catch-ში თავის დაზღვევის მიზნით, თუ ცარიელია ჩვენი localStorage იმ initialValues დააბრუნებს რაც გავატანეთ აპიდან.  
  const[savedTasks, setsavedTasks] = useState(()=>{
      try{
          const localTaskValue = window.localStorage.getItem(key)
          return localTaskValue? JSON.parse(localTaskValue) : initialValue
      }
      catch(err){
          console.log(err)
          return initialValue
      }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(savedTasks))
  }, [key,savedTasks]);

  return [savedTasks, setsavedTasks];
}

export default useLocalStorage;
