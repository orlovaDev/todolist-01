import {ChangeEvent, useState} from "react";
import {Box, TextField} from "@mui/material";
import {TaskType} from "./TodolistItem.tsx";
import {getTaskSX} from "./EditableSpan.styles.ts";

type PropsType = {
  title: string,
  changeTitle: (newTitle: string) => void,
  isDone: TaskType["isDone"],
}

export const EditableSpan = ({title, changeTitle, isDone}: PropsType) => {

  const [itemTitle, setItemTitle] = useState(title)
  const [editMode, setEditMode] = useState(false)

  const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value)
  }
  const onEditMode = () => {
    setEditMode(true)
  }
  const offEditMode = () => {
    changeTitle(itemTitle)
    setEditMode(false)
  }
  return (
    editMode
      ? <TextField
        variant="standard"
        value={itemTitle}
        onChange={setLocalTitleHandler}
        onBlur={offEditMode}
        autoFocus
      />
      : <Box
        component="span"
        onDoubleClick={onEditMode}
        sx={getTaskSX(isDone)}
      >{title}</Box>
  )
}