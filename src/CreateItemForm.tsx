import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
  createItem: (itemTitle: string) => void,
  maxTitleLenght : number
}

export const CreateItemForm = ({createItem, maxTitleLenght}: PropsType) => {

  const [itemInput, setItemInput] = useState('')
  const [error, setError] = useState(false)

  const isItemTitleValid = Boolean(itemInput.length) && itemInput.length <= 15

  const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setItemInput(e.currentTarget.value)
  }

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isItemTitleValid) {
      createItemHandler()
    }
  }

  const createItemHandler = () => {
    const trimmedTitle = itemInput.trim()
    if (trimmedTitle) {
      createItem(trimmedTitle)
    } else {
      setError(true)
    }
    setItemInput('')
  }


  return (
    <div>
      <input
        className={error ? "error" : ""}
        value={itemInput}
        onChange={setLocalTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <Button
        title={'+'}
        disabled={!isItemTitleValid}
        onClick={createItemHandler}
      />
      {itemInput.length === 0 && <div style={{color: error ? "red" : "inherit"}}>Enter title end press button</div>}
      {isItemTitleValid && <div>Max title length is {maxTitleLenght} charters</div>}
      {itemInput.length > maxTitleLenght && <div style={{color: "red"}}>Title length is too long</div>}
    </div>
  )
}