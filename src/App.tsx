import './App.css'
import {TaskPropsType, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export const App = () => {
  // data
  const todolistTitle = "What to learn"
  const [tasks, setTasks] = useState<TaskPropsType[]>([
      {id: 1, title: "HTML", isDone: true},
      {id: 2, title: "CSS", isDone: true},
      {id: 3, title: "JS/TS", isDone: false},
      {id: 10, title: "REDUX", isDone: false},
    ]
  )
  const deleteTask = (taskId: TaskPropsType["id"]) => {
    const nextState: TaskPropsType[] = tasks.filter(t => t.id !== taskId)
    setTasks(nextState)
  }
  return (
    <div className="app">
      <TodolistItem
        title={todolistTitle}
        tasks={tasks}
        deleteTask={deleteTask}
      />
    </div>
  )
}
