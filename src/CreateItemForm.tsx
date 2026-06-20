import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type PropsType = {
  createItem: (itemTitle: string) => void,
  maxTitleLength: number
}

export const CreateItemForm = ({createItem, maxTitleLength}: PropsType) => {

  const [itemInput, setItemInput] = useState('')
  const [error, setError] = useState(false)

  const isTooLong = itemInput.length > maxTitleLength

  const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    setItemInput(inputValue)

    // Если текст превысил лимит, СРАЗУ включаем красную рамку
    if (inputValue.length > maxTitleLength) {
      setError(true)
    } else {
      // Если пользователь стирает лишние символы и возвращается в лимит, гасим ошибку
      setError(false)
    }
  }
  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

  const createItemHandler = () => {
    const trimmedTitle = itemInput.trim()
    if (!trimmedTitle || isTooLong) {
      setError(true )
      return
    }
    createItem(trimmedTitle)
    setItemInput('')
    setError(false) // Сбрасываем ошибку после успешного добавления
  }

  let userMessage = "";
  if (itemInput.length === 0) {
    userMessage = error ? "Title is required!" : "";
  } else if (itemInput.length > maxTitleLength) {
    userMessage = "Title length is too long";
  } else {
    userMessage = `Max title length is ${maxTitleLength} characters`;
  }

  return (
    <div>
      <TextField
        color={"secondary"}
        label={'Enter a title'}
        variant="outlined"
        size="small"
        value={itemInput}
        onChange={setLocalTitleHandler}
        onKeyDown={createItemOnEnterHandler}
        error={error}
        helperText={userMessage}
        sx={{
          '& .MuiFormHelperText-root': {
            // Если ошибки нет, цвет фиолетовый. Если error={true}, MUI сам перекрасит в красный
            color: error ? 'red' : 'purple',
            fontWeight: 500,
          }
        }}
      />

      <IconButton
        onClick={createItemHandler}
        disabled={isTooLong}
        size="small"
        color="secondary"
      >
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}