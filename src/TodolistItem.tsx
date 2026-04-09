import {Button} from "./Button.tsx";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
}

export const TodolistItem = ({title, tasks}: PropsType) => {
  const tasksList = tasks.length === 0
    ? <span>Tasks list is empty</span>
    : <ul>
      {
        tasks.map((task: TaskType) => {
          debugger
          return <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
            />
            <span>{task.title}</span>
          </li>
        })
      }
    </ul>

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title="+"/>
      </div>
      {tasksList}
      <div>
        <Button title="All"/>
        <Button title="Active"/>
        <Button title="Completed"/>
      </div>
    </div>
  );
};

