import {Button} from "./Button.tsx";

export type TaskPropsType = {
  id: number
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: TaskPropsType[]
  deleteTask: (taskId: TaskPropsType["id"]) => void
}

export const TodolistItem = ({title, tasks, deleteTask}: TodolistPropsType) => {
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
        <Button title="All" />
        <Button title="Active" />
        <Button title="Completed" />
      </div>
    </div>
  );
};

