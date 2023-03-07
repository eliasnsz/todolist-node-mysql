import { ITask } from "../types";
import connection from "./connectToDatabase";

const getAll = async () => {
  const [ tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks as ITask[] | [];
};

const createTask = async (task: { title: string }) => {
  const query = 'INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)';
  const [ createdTaskResult ] = await connection.execute(
    query, [ task.title, "Pendente", new Date().toISOString() ]
  );
  
  return createdTaskResult;
};

const deleteTask = async (id: string) => {
  await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
  return;
};

const updateTask = async (id: string, task: ITask) => {
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
  const updatedTask = await connection
    .execute(query, [task.title, task.status, id]);
  return updatedTask;
};

const tasksModels = { getAll, createTask, deleteTask, updateTask };
export default tasksModels;

