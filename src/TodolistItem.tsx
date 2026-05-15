import {Button} from "./Button.tsx";
import {FilterPropsType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from 'react'

export type TaskPropsType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: TaskPropsType[]
  deleteTask: (taskId: TaskPropsType["id"]) => void
  changeFilter: (filter: FilterPropsType) => void
  createTask: (title: string) => void
  deleteAllTask: () => void
  filter: FilterPropsType
  changeTaskStatus: (taskId: TaskPropsType["id"], isDone: TaskPropsType["isDone"]) => void
}

export const TodolistItem = ({
                               title,
                               tasks,
                               deleteTask,
                               changeFilter,
                               createTask,
                               deleteAllTask,
                               filter,
                               changeTaskStatus
                             }: TodolistPropsType) => {

  // const [taskInput, setTaskInput] = useState("")
  const [error, setError] = useState(false)
  const [taskInput, setTaskInput] = useState('')

  const tasksList = tasks.length === 0
    ? <span>Tasks list is empty</span>
    : <ul>
      {
        tasks.map((task: TaskPropsType) => {
          const deleteTaskHandler = () => {
            deleteTask(task.id)
          }
          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)

          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
              />
              <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
              <Button
                title={"x"}
                onClick={deleteTaskHandler}
              />
            </li>
          )
        })
      }</ul>

  const createTaskHandler = () => {
    const trimmedTitle = taskInput.trim()
    if (trimmedTitle) {
      createTask(trimmedTitle)
    } else {
      setError(true)
    }
    setTaskInput('')
  }

  const isTaskTitleValid = Boolean(taskInput.length) && taskInput.length <= 15
  const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTaskInput(e.currentTarget.value)
  }

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isTaskTitleValid) {
      createTaskHandler()
    }
  }
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className = { error ? "error" : ""}
          value={taskInput}
          onChange={setLocalTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button
          title={'+'}
          disabled={!isTaskTitleValid}
          onClick={createTaskHandler}
        />
        {taskInput.length === 0 && <div style={{ color: error ? "red" : "inherit" }}>Enter title end press button</div>}
        {isTaskTitleValid && <div>Max title length is 15 charters</div>}
        {taskInput.length > 15 && <div style={{ color: "red" }}>Title length is too long</div>}
      </div>
      {tasksList}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : "" }
          title="All"
          onClick={() => changeFilter('all')}
        />
        <Button
          className={filter === "active" ? "active-filter" : "" }
          title="Active"
          onClick={() => changeFilter('active')}
        />
        <Button
          className={filter === "completed" ? "active-filter" : "" }
          title="Completed"
          onClick={() => changeFilter('completed')}
        />
        <br />
        <Button
          className="delete-all"
          title="Delete all tasks"
          onClick={() => deleteAllTask()}
        />
      </div>
    </div>
  );
};

