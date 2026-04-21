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
}

export const TodolistItem = ({
                               title,
                               tasks,
                               deleteTask,
                               changeFilter,
                               createTask,
                               deleteAllTask
                             }: TodolistPropsType) => {
  const tasksList = tasks.length === 0
    ? <span>Tasks list is empty</span>
    : <ul>

      {
        tasks.map((task: TaskPropsType) => {
          const deleteTaskHandler = () => {
            deleteTask(task.id)
          }
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
              />
              <span>{task.title}</span>
              <Button
                title={"x"}
                onClick={deleteTaskHandler}
              />
            </li>
          )
        })
      }</ul>
  const [taskTitle, setTaskTitle] = useState('')
  const createTaskHandler = () => {
    createTask(taskTitle)
    setTaskTitle('')
  }
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  }
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button
          title={'+'}
          onClick={() => {
            createTaskHandler()
          }}
        />
      </div>
      {tasksList}
      <div>
        <Button
          title="All"
          onClick={() => changeFilter('all')}
        />
        <Button
          title="Active"
          onClick={() => changeFilter('active')}
        />
        <Button
          title="Completed"
          onClick={() => changeFilter('completed')}
        />
        <br />
        <Button
          style={{backgroundColor: 'red', color: 'white'}}
          title="Delete all tasks"
          onClick={() => deleteAllTask()}
        />
      </div>
    </div>
  );
};

