import './App.css'
import {TaskType, TodolistItem} from "./TodolistItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {getFilterTasks} from "./utilites/getFilteredTasks.ts";
import {AppBar, Box, Container, createTheme, CssBaseline, Grid, IconButton, Paper, Switch, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {container} from "./Todolist.styles.ts";
import {NavButton} from "./NavButton.ts";
import {ThemeProvider} from "@mui/material/styles";
import {changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer} from "./model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from "./model/tasks-reducer.ts";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TaskStateType = {
  [todolistId: string]: TaskType[]
}

export const App = () => {

  // BLL
  const todolistId_1 = v1()
  const todolistId_2 = v1()

  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {
      id: todolistId_1,
      title: "What to learn",
      filter: "all"
    },
    {
      id: todolistId_2,
      title: "What to buy",
      filter: "all"
    },
  ])

  // const [todolists, setTodolists] = useState<TodolistType[]>([
  //   {
  //     id: todolistId_1,
  //     title: "What to learn",
  //     filter: "all"
  //   },
  //   {
  //     id: todolistId_2,
  //     title: "What to buy",
  //     filter: "all"
  //   },
  // ]);

  const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId_1]: [
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "CSS", isDone: false},
      {id: v1(), title: "JS/TS", isDone: true},
      {id: v1(), title: "REDUX", isDone: false},
    ],
    [todolistId_2]: [
      {id: v1(), title: "MILK", isDone: false},
      {id: v1(), title: "BREAD", isDone: true},
      {id: v1(), title: "SALT", isDone: true},
      {id: v1(), title: "WATER", isDone: false},
    ],
  })

  // tasks
  const deleteTask = (payload: { taskId: TaskType["id"], todolistId: TodolistType["id"] }) => {
    // ПРЯМАЯ ЛОГИКА ПО ШАГАМ
    // const todolistsTasks = tasks[todolistId]
    // const filteredTasks = todolistsTasks.filter(task => task.id !== taskId)
    // const nextTasksState = {...tasks}
    // nextTasksState[todolistId] = filteredTasks
    // setTasks(nextTasksState)
            // 2-й вариант записи useState
    // const {taskId, todolistId} = payload
    // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})

            // useReducer
    const {taskId, todolistId} = payload
    dispatchToTasksReducer(deleteTaskAC({todolistId: todolistId, id: taskId}))
  }

  const createTask = (payload: { title: TaskType["title"], todolistId: TodolistType["id"] }) => {
    const {title, todolistId} = payload
    dispatchToTasksReducer(createTaskAC({title, todolistId}))
    // const newTask: TaskType = {
    //   id: v4(),
    //   title: title,
    //   isDone: false
    // }
    // const addedTask = [...tasks[todolistId], newTask]
    // const nextTasksState = {...tasks}
    // nextTasksState[todolistId] = addedTask
    // setTasks(nextTasksState)
    // setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
  }

  const changeTaskStatus = (payload: { taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"] }) => {
    // const todolistsTasks = tasks[todolistId]
    // const changedStatusTasks = todolistsTasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
    // const nextTasksState = {...tasks}
    // nextTasksState[todolistId] = changedStatusTasks
    // setTasks(nextTasksState)
    // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    // const nextState: TaskType[] = tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
    // setTasks(nextState)
    const {taskId, isDone, todolistId} = payload
    dispatchToTasksReducer(changeTaskStatusAC({id: taskId, isDone, todolistId}))
  }

  const changeTaskTitle = (payload: { taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"] }) => {
    const {taskId, title, todolistId} = payload
    dispatchToTasksReducer(changeTaskTitleAC({id: taskId, title, todolistId}))
    // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)})
  }


  // todolists
  const deleteTodolist = (todolistId: TodolistType["id"]) => {
    // const action = deleteTodolistAC(todolistId)
    dispatchToTodolistsReducer(deleteTodolistAC(todolistId))
  }

  const createTodolist = (title: TodolistType["title"]) => {
    const action = createTodolistAC(title)
    dispatchToTodolistsReducer(action)
    // setTasks({...tasks, [action.payload.id]: []})
  }

  const changeTodolistFilter = (payload: { filter: FilterValueType, todolistId: TodolistType["id"] }) => {
    const {filter, todolistId} = payload
    const action = changeTodolistFilterAC({ filter, id: todolistId })
    dispatchToTodolistsReducer(action)
  }

  const changeTodolistTitle = (payload: { title: TodolistType["title"], todolistId: TodolistType["id"] }) => {
    const {title, todolistId} = payload
    dispatchToTodolistsReducer(changeTodolistTitleAC({title, id: todolistId}))
  }

  //   UI
  const todolistsComponents = todolists.map(tl => {
    const filteredTasks = getFilterTasks(tasks[tl.id], tl.filter)
    return (
      <Grid key={tl.id}>
        <Paper
          elevation={6}
          sx={{padding: "15px"}}
        >
          <TodolistItem
            todolistId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            changeTodolistFilter={changeTodolistFilter}
            deleteTodolist={deleteTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        </Paper>
      </Grid>
    )
  })
  const [isDark, setDark] = useState(false)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#fffd85',
      },
      secondary: {
        main: '#800647'
      },
      mode: isDark ? "dark" : "light",
    },
  })
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Container
              maxWidth="lg"
              sx={container}
            >
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <Box>
                <Switch onChange={() => setDark(!isDark)} />
                <NavButton size={'small'}>Sign in</NavButton>
                <NavButton size={'small'}>Sign up</NavButton>
                <NavButton
                  size={'small'}
                  background={theme.palette.secondary.light}
                  // background="#490327"
                >Faq</NavButton>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Grid
            container
            sx={{p: "15px 0"}}
          >
            <CreateItemForm
              createItem={createTodolist}
              maxTitleLength={20}
            />
          </Grid>
          <Grid
            container
            spacing={8}
          >
            {todolistsComponents}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}


