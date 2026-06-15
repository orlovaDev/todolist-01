import {TaskType} from "../TodolistItem.tsx";
import {FilterValueType} from "../app/App.tsx";

export const getFilterTasks = (tasks: TaskType[], filter: FilterValueType) => {
  let filteredTasks = tasks

  if (filter === "active") {
    filteredTasks = tasks.filter(t => !t.isDone)
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.isDone)
  }

  return filteredTasks
}