import { NextFunction, Request, Response } from "express";

interface IRequest extends Request {
  title?: string;
  status?: string;
}

const validateFieldTitle = (request: Request, response: Response, next: NextFunction) => {
  const { title } = request.body as IRequest;

  if (title === undefined) {
    return response.status(400).json({ 
      message: "O campo 'título' é obrigatório" 
    });
  }

  if (title.trim() === '') {
    return response.status(400).json({ 
      message: "O campo 'título' não pode estar vazio" 
    });
  }

  next();
};

const validateFieldStatus = (request: Request, response: Response, next: NextFunction) => {
  const { status } = request.body as IRequest;

  if (status === undefined) {
    return response.status(400).json({ 
      message: "O campo 'status' é obrigatório" 
    });
  }

  if (status.trim() === '') {
    return response.status(400).json({ 
      message: "O campo 'status' não pode estar vazio" 
    });
  }

  next();
};

const middleware = { validateFieldTitle, validateFieldStatus };
export default middleware;