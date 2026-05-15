import {TaskPropsType} from "../TodolistItem.tsx";
import {FilterPropsType} from "../App.tsx";

export const getFilterTasks = (tasks: TaskPropsType[], filter: FilterPropsType) => {
  let filteredTasks = tasks

  if (filter === "active") {
    filteredTasks = tasks.filter(t => !t.isDone)
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.isDone)
  }

  return filteredTasks
}