import {Box, Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import {FilterValueType, TodolistType} from "./App.tsx";
import {ChangeEvent} from 'react'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {container} from "./Todolist.styles.ts";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  todolistId: TodolistType["id"]
  title: string
  tasks: TaskType[]
  deleteTask: (payload: { taskId: TaskType["id"], todolistId: TodolistType["id"] }) => void
  changeTodolistFilter: (payload: { filter: FilterValueType, todolistId: TodolistType["id"] }) => void
  createTask: (payload: { title: TaskType["title"], todolistId: TodolistType["id"] }) => void
  changeTaskTitle: (payload: { taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"] }) => void
  filter: FilterValueType
  changeTaskStatus: (payload: { taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"] }) => void
  deleteTodolist: (todolistId: TodolistType["id"]) => void
  changeTodolistTitle: (payload: { title: TodolistType["title"], todolistId: TodolistType["id"] }) => void
}

export const TodolistItem = ({
                               todolistId,
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
    : <List>
      {
        tasks.map((task: TaskType) => {

          const deleteTaskHandler = () => {
            deleteTask({taskId: task.id, todolistId: todolistId})
          }

          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus({
            taskId: task.id,
            isDone: e.currentTarget.checked,
            todolistId: todolistId
          })

          const changeTaskTitleHandler = (newTitle: TaskType["title"]) => {
            changeTaskTitle({taskId: task.id, title: newTitle, todolistId: todolistId})
          }

          return (
            <ListItem
              sx={container}
              disablePadding
              key={task.id}
              className={task.isDone ? "is-done" : ""}
            >
              {/*<input*/}
              {/*  type="checkbox"*/}
              {/*  checked={task.isDone}*/}
              {/*  onChange={changeTaskStatusHandler}*/}
              {/*/>*/}

              <Checkbox checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                        size="small"
              />

              <EditableSpan
                title={task.title}
                changeTitle={changeTaskTitleHandler}
              isDone={task.isDone}
              />

              <IconButton onClick={deleteTaskHandler} size="small">
                <DeleteForeverIcon />
              </IconButton>

            </ListItem>
          )
        })
      }</List>

  const createTaskHandler = (taskTitle: TaskType["title"]) => {
    createTask({title: taskTitle, todolistId: todolistId})
  }

  const changeTodolistTitleHandler = (newTitle: TodolistType["title"]) => {
    changeTodolistTitle({title: newTitle, todolistId})
  }
  const deleteTodolistHandler = () => deleteTodolist(todolistId)

  return (
    <div>
      <h3>
        <EditableSpan
          isDone={false}
          title={title}
          changeTitle={changeTodolistTitleHandler}
        />
        <IconButton onClick={deleteTodolistHandler} size="small">
          <DeleteForeverIcon />
        </IconButton>
      </h3>
      <CreateItemForm
        createItem={createTaskHandler}
        maxTitleLength={15}
      />
      {tasksList}
      <Box sx={container}>
        <Button
          size="small"
          disableElevation   //без легкая тень у кнопок
          variant="contained"
          color={filter === "all" ? "secondary" : "primary"}
          onClick={() => changeTodolistFilter({filter: 'all', todolistId})}
        >
          All
        </Button>

        <Button
          size="small"
          disableElevation
          variant="contained"
          color={filter === "active" ? "secondary" : "primary"}
          onClick={() => changeTodolistFilter({filter: 'active', todolistId})}
        >
          Active
        </Button>

        <Button
          size="small"
          disableElevation
          variant="contained"
          color={filter === "completed" ? "secondary" : "primary"}
          onClick={() => changeTodolistFilter({filter: 'completed', todolistId})}
        >
          Completed
        </Button>
      </Box>
    </div>
  )
    ;
};

