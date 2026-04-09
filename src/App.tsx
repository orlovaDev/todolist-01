import './App.css'
import {TaskType, TodolistItem} from "./TodolistItem.tsx";

const todolistTitle_1 = "What to learn"
const todolistTitle_2 = "What to buy"
const todolistTitle_3 = "What to read"

const tasks_1: TaskType[] = [
  {id: 1, title: "HTML", isDone: true},
  { id: 2, title: "CSS", isDone: true },
  { id: 3, title: "JS/TS", isDone: false },
  { id: 10, title: "REDUX", isDone: false },
]
const tasks_2: TaskType[] = [
  { id: 4, title: "Bread", isDone: true },
  { id: 5, title: "Water", isDone: true },
  { id: 6, title: "Salt", isDone: false },
]
const tasks_3: TaskType[] = []

export const App = () => {
  return (
    <div className="app">
      <TodolistItem title={todolistTitle_1} tasks={tasks_1} />
      <TodolistItem title={todolistTitle_2} tasks={tasks_2} />
      <TodolistItem title={todolistTitle_3} tasks={tasks_3} />
    </div>
  )
}
