import {ChangeEvent, useState} from "react";

type PropsType = {
  title: string,
  changeTitle: (newTitle: string) => void,
  className?: string
}

export const EditableSpan = ({title, changeTitle, className}: PropsType) => {
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
      ? <input
        value={itemTitle}
        onChange={setLocalTitleHandler}
        onBlur={offEditMode}
        autoFocus
      />
      : <span
        onDoubleClick={onEditMode}
        className={className}
      >{title}</span>
  )
}