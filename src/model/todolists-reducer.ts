import {FilterValueType, TodolistType} from "../app/App.tsx";
import {v1} from "uuid";

//DeleteTodolistActionType

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAT = ReturnType<typeof createTodolistAC>
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

export type ActionType = DeleteTodolistAT | CreateTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {
  switch (action.type) {
    case "delete_todolist":
      const id = action.payload.id;
      return todolists.filter(tl => tl.id !== id);

    case "create_todolist": {
      const {id, title} = action.payload;
      const newTodo: TodolistType = {
        id: id,
        title: title,
        filter: "all"
      }
      return [...todolists, newTodo]
    }

    case "change_todolist_title":
    {
      const {id, title} = action.payload
      return todolists.map(tl => tl.id === id ? {...tl, title: title} : tl)
    }

    case "change_todolist_filter":
    {
      const {id, filter} = action.payload
      return todolists.map(tl => tl.id === id ? {...tl, filter: filter} : tl)
    }

    default:
      return todolists
  }
};


// deleteTodolistActionCreator
export const deleteTodolistAC = (id: TodolistType['id']) => ({
  type: "delete_todolist",
  payload: {
    id: id,
  }
} as const)

export const createTodolistAC = (title: TodolistType['title']) => ({
  type: "create_todolist",
  payload: {
    title: title,
    id: v1()
  }
} as const)

export const changeTodolistTitleAC = (payload: { title: TodolistType["title"], id: TodolistType["id"] }) => ({
  type: "change_todolist_title",
  payload: payload
} as const)

export const changeTodolistFilterAC = (payload: { filter: FilterValueType, id: TodolistType["id"] }) => ({
  type: "change_todolist_filter",
  payload: payload
} as const)