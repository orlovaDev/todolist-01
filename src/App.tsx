import './App.css'
import {TaskPropsType, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1, v4} from "uuid";


export type FilterPropsType = 'all' | 'active' | 'completed'

export const App = () => {
  // data
  const todolistTitle = "What to learn"
  const [tasks, setTasks] = useState<TaskPropsType[]>([
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "CSS", isDone: false},
      {id: v1(), title: "JS/TS", isDone: true},
      {id: v1(), title: "REDUX", isDone: false},
    ]
  )
  const [filter, setFilter] = useState<FilterPropsType>("all")

  const deleteTask = (taskId: TaskPropsType["id"]) => {
    const nextState: TaskPropsType[] = tasks.filter(t => t.id !== taskId)
    setTasks(nextState)
  }
  const changeFilter = (filter: FilterPropsType) => {
    setFilter(filter)
  }
  let filteredTasks: TaskPropsType[] = tasks
  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.isDone)
  }
  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone)
  }

  const deleteAllTask = () => {
    setTasks([])
  }

  const createTask = (title: string) => {
    const newTask = {
      id: v4(),
      title: title,
      isDone: false
    }
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  return (
    <div className="app">
      <TodolistItem
        title={todolistTitle}
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
        deleteAllTask={deleteAllTask}
      />
    </div>
  )
}


