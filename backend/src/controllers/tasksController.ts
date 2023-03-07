import { Response, Request } from "express";
import tasksModels from "../models/tasksModel";

const getAll = async (_request: Request, response: Response) => {
  const tasks = await tasksModels.getAll();
  return response.status(200).json(tasks);
};

const createTask = async (request: Request, response: Response) => {
  const { title } = request.body;
  const createdTaskResult = await tasksModels.createTask({ title });
  return response.status(201).json(createdTaskResult);
};

const deleteTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  await tasksModels.deleteTask(id);
  return response.status(204).send();
};

const updateTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  await tasksModels.updateTask(id, request.body);
  return response.status(204).json();
};

const tasksController = { getAll, createTask, deleteTask, updateTask };
export default tasksController;