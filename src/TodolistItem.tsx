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
  deleteTask: (payload: {taskId: TaskType["id"], todolistId: TodolistType["id"]}) => void
  changeTodolistFilter: (payload: {filter: FilterValueType, todolistId: TodolistType["id"]}) => void
  createTask: (payload: {title: TaskType["title"], todolistId: TodolistType["id"]}) => void
  changeTaskTitle: (payload: {taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"]})=> void
  filter: FilterValueType
  changeTaskStatus: (payload: { taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"] })=> void
  deleteTodolist: (todolistId: TodolistType["id"]) => void
  changeTodolistTitle: (payload : {title: TodolistType["title"], todolistId: TodolistType["id"]}) => void
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
            deleteTask({taskId: task.id, todolistId: todolistId})
          }

          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus({taskId: task.id, isDone: e.currentTarget.checked, todolistId: todolistId})

          const changeTaskTitleHandler = (newTitle: TaskType["title"]) => {
            changeTaskTitle({taskId: task.id, title: newTitle, todolistId: todolistId})
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
      createTask({title: taskTitle , todolistId: todolistId})
  }

  const changeTodolistTitleHandler = (newTitle: TodolistType["title"]) => {
    changeTodolistTitle({title: newTitle, todolistId})
  }
  const deleteTodolistHandler = () => deleteTodolist(todolistId)

  return (
    <div>
      <h3>
      <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
        <Button
          title = "x"
          onClick={deleteTodolistHandler}
          className="delete-all"
        />
      </h3>
      <CreateItemForm createItem={createTaskHandler} maxTitleLength={15}/>
      {tasksList}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : "" }
          title="All"
          onClick={() => changeTodolistFilter({filter: 'all', todolistId})}
        />
        <Button
          className={filter === "active" ? "active-filter" : "" }
          title="Active"
          onClick={() => changeTodolistFilter({filter: 'active', todolistId})}
        />
        <Button
          className={filter === "completed" ? "active-filter" : "" }
          title="Completed"
          onClick={() => changeTodolistFilter({filter: 'completed', todolistId})}
        />
      </div>
    </div>
  );
};

