import {Button} from "./Button.tsx";
import {FilterPropsType} from "./App.tsx";

export type TaskPropsType = {
  id: number
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: TaskPropsType[]
  deleteTask: (taskId: TaskPropsType["id"]) => void
  changeFilter: (filter: FilterPropsType) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter}: TodolistPropsType) => {
  const tasksList = tasks.length === 0
    ? <span>Tasks list is empty</span>
    : <ul>
      {
        tasks.map((task: TaskPropsType) => {
          debugger
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone}/>
              <span>{task.title}</span>
              <Button title={"x"} onClick={() => deleteTask(task.id)}/>
            </li>
          )
        })
      }
    </ul>

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title="+" />
      </div>
      {tasksList}
      <div>
        <Button title="All" onClick={() => changeFilter('all')}/>
        <Button title="Active" onClick={() => changeFilter('active')}/>
        <Button title="Completed" onClick={() => changeFilter('completed')} />
      </div>
    </div>
  );
};

