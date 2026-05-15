import {Button} from "./Button.tsx";
import {FilterValueType, TodolistType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from 'react'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  todolistId: TodolistType["id"]
  title: string
  tasks: TaskType[]
  deleteTask: (taskId: TaskType["id"], todolistId: TodolistType["id"]) => void
  changeFilter: (filter: FilterValueType, todolistId: TodolistType["id"]) => void
  createTask: (title: string, todolistId: TodolistType["id"]) => void
  filter: FilterValueType
  changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => void
  deleteTodolist: (todolistId: TodolistType["id"]) => void
}

export const TodolistItem = ({ todolistId,
                               title,
                               tasks,
                               deleteTask,
                               changeFilter,
                               createTask,
                               filter,
                               changeTaskStatus,
                               deleteTodolist
                             }: TodolistPropsType) => {

  // const [taskInput, setTaskInput] = useState("")
  const [error, setError] = useState(false)
  const [taskInput, setTaskInput] = useState('')

  const tasksList = tasks.length === 0
    ? <span>Tasks list is empty</span>
    : <ul>
      {
        tasks.map((task: TaskType) => {
          const deleteTaskHandler = () => {
            deleteTask(task.id, todolistId)
          }
          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)

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
      createTask(trimmedTitle, todolistId)
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
      <h3>
        {title}
        <Button
          title = "x"
          onClick={() => deleteTodolist(todolistId)}
          className="delete-all"
        />
      </h3>
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
          onClick={() => changeFilter('all', todolistId)}
        />
        <Button
          className={filter === "active" ? "active-filter" : "" }
          title="Active"
          onClick={() => changeFilter('active', todolistId)}
        />
        <Button
          className={filter === "completed" ? "active-filter" : "" }
          title="Completed"
          onClick={() => changeFilter('completed', todolistId)}
        />
      </div>
    </div>
  );
};

