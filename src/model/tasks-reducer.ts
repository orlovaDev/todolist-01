import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";
import {TaskStateType, TodolistType} from "../app/App.tsx";
import {TaskType} from "../TodolistItem.tsx";
import {v1} from "uuid";

type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
type CreateTaskAT = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType = DeleteTodolistAT | CreateTodolistAT | DeleteTaskAT | CreateTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT

export const tasksReducer = (tasks: TaskStateType, action: ActionType): TaskStateType => {
  switch (action.type) {

    case "create_todolist":
      return {...tasks, [action.payload.id]: []}

    case "delete_todolist":
      const nextState = {...tasks}
      delete nextState[action.payload.id]
      return nextState

    case "delete_task":
      const {todolistId, id} = action.payload
      return {...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)}

    case "create_task": {
      const {title, todolistId} = action.payload
      const newTask: TaskType = {
        id: v1(),
        title: title,
        isDone: false
      }
      return {...tasks, [todolistId]: [...tasks[todolistId], newTask]}
    }

    case "change_task_status": {
      const {id, isDone, todolistId} = action.payload
      return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: isDone} : t)}
    }

    case "change_task_title": {
      const {id, title, todolistId} = action.payload
      return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, title: title} : t)}
    }
    default:
      return tasks
  }
}

export const deleteTaskAC = (payload: { id: TaskType["id"], todolistId: TodolistType['id'] }) => ({
  type: "delete_task",
  payload: payload
} as const)

export const createTaskAC = (payload: { title: TaskType["title"], todolistId: TodolistType["id"] }) => ({
  type: "create_task",
  payload: payload
} as const)

export const changeTaskStatusAC = (payload: { id: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"] }) => ({
  type: "change_task_status",
  payload: payload
} as const)

export const changeTaskTitleAC = (payload: { id: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"] }) => ({
  type: "change_task_title",
  payload: payload
} as const)
