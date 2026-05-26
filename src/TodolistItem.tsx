import {Button} from "./Button.tsx";
import {FilterValueType, TodolistType} from "./App.tsx";
import {ChangeEvent} from 'react'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

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
  changeTodolistFilter: (filter: FilterValueType, todolistId: TodolistType["id"]) => void
  createTask: (title: string, todolistId: TodolistType["id"]) => void
  changeTaskTitle: (taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"]) => void
  filter: FilterValueType
  changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => void
  deleteTodolist: (todolistId: TodolistType["id"]) => void
  changeTodolistTitle: (title: TodolistType["title"], todolistId: TodolistType["id"]) => void
}

export const TodolistItem = ({ todolistId,
                               title,
                               tasks,
                               deleteTask,
                               changeTodolistFilter,
                               createTask,
                               changeTaskTitle,
                               filter,
                               changeTaskStatus,
                               deleteTodolist,
                               changeTodolistTitle
                             }: TodolistPropsType) => {

  const tasksList = tasks.length === 0
    ? <span>Tasks list is empty</span>
    : <ul>
      {
        tasks.map((task: TaskType) => {
          const deleteTaskHandler = () => {
            deleteTask(task.id, todolistId)
          }
          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
          const changeTaskTitleHandler = (newTitle: TaskType["title"]) => {
            changeTaskTitle(task.id, newTitle, todolistId)
          }
          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
              />
              <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} className={task.isDone ? "task-done" : "task"}/>
              <Button
                title={"x"}
                onClick={deleteTaskHandler}
              />
            </li>
          )
        })
      }</ul>

  const createTaskHandler = (taskTitle: TaskType["title"]) => {
      createTask(taskTitle, todolistId)
  }

  const changeTitle = (newTitle: TodolistType["title"]) => {
    changeTodolistTitle(newTitle, todolistId)
  }

  return (
    <div>
      <h3>
      <EditableSpan title={title} changeTitle={changeTitle}/>
        <Button
          title = "x"
          onClick={() => deleteTodolist(todolistId)}
          className="delete-all"
        />
      </h3>
      <CreateItemForm createItem={createTaskHandler} maxTitleLenght={15}/>
      {tasksList}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : "" }
          title="All"
          onClick={() => changeTodolistFilter('all', todolistId)}
        />
        <Button
          className={filter === "active" ? "active-filter" : "" }
          title="Active"
          onClick={() => changeTodolistFilter('active', todolistId)}
        />
        <Button
          className={filter === "completed" ? "active-filter" : "" }
          title="Completed"
          onClick={() => changeTodolistFilter('completed', todolistId)}
        />
      </div>
    </div>
  );
};

