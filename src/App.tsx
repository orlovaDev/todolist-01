import './App.css'
import {TaskType, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1, v4} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {getFilterTasks} from "./utilites/getFilteredTasks.tsx";


export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

type TaskStateType = {
  [todolistId: string]: TaskType[]
}

export const App = () => {

  // BLL
  const todolistId_1 = v1()
  const todolistId_2 = v1()

  const [todolists, setTodolists] = useState<TodolistType[]>([
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
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
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
  const deleteTask = (taskId: TaskType["id"], todolistId: TodolistType["id"]) => {

    // ПРЯМАЯ ЛОГИКА ПО ШАГАМ
    // const todolistsTasks = tasks[todolistId]
    // const filteredTasks = todolistsTasks.filter(task => task.id !== taskId)
    // const nextTasksState = {...tasks}
    // nextTasksState[todolistId] = filteredTasks
    // setTasks(nextTasksState)

    // 2-й вариант записи
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
  }

  const createTask = (title: TaskType["title"], todolistId: TodolistType["id"]) => {
    const newTask = {
      id: v4(),
      title: title,
      isDone: false
    }
    // const addedTask = [...tasks[todolistId], newTask]
    // const nextTasksState = {...tasks}
    // nextTasksState[todolistId] = addedTask
    // setTasks(nextTasksState)
    setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask] })
  }

  const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => {
    // const todolistsTasks = tasks[todolistId]
    // const changedStatusTasks = todolistsTasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
    // const nextTasksState = {...tasks}
    // nextTasksState[todolistId] = changedStatusTasks
    // setTasks(nextTasksState)

    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t) })


    // const nextState: TaskType[] = tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
    // setTasks(nextState)
  }

  const changeTaskTitle = (taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"]) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t) })
  }


  // todolists
  const deleteTodolist = (todolistId: TodolistType["id"]) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
  }

  const createTodolist = (title: TodolistType["title"]) => {
    const newTodoId = v1()
    const newTodo: TodolistType = {
      id: newTodoId,
      title: title,
      filter: "all"
    }
    setTodolists([...todolists, newTodo])
    setTasks({...tasks, [newTodoId]: []})
  }

  const changeTodolistFilter = (filter: FilterValueType, todolistId: TodolistType["id"]) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter } : tl))
  }

  const changeTodolistTitle = (title: TodolistType["title"], todolistId: TodolistType["id"]) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title } : tl))
  }

  //   UI
  const todolistsComponents = todolists.map(tl => {
    const filteredTasks = getFilterTasks(tasks[tl.id], tl.filter)
    return (
      <TodolistItem
        key={tl.id}
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
    )
  })

  return (
    <div className="app">
      <CreateItemForm createItem={createTodolist} maxTitleLenght={15}/>
      {todolistsComponents}
    </div>
  )
}


