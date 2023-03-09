import express from "express";

import middleware from "./middlewares/middleware";
import tasksController from "./controllers/tasksController";


const router = express.Router();

router.get("/tasks", tasksController.getAll);
router.post("/tasks", middleware.validateFieldTitle, tasksController.createTask);
router.delete("/tasks/:id", tasksController.deleteTask);
router.put("/tasks/:id", 
  middleware.validateFieldTitle, 
  middleware.validateFieldStatus, 
  tasksController.updateTask
);

export default router;