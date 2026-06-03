import {TaskType} from "./TodolistItem.tsx";
import {SxProps} from "@mui/material";

export const getTaskSX = (isDone: TaskType["isDone"]) : SxProps => ({
  fontWeight: isDone ? "normal" : "bold",
  textDecoration: isDone ? "line-through" : "none",
  fontStyle: isDone ? "italic" : "normal",
  opacity: isDone ? 0.5 : 1
})

