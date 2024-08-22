import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUsersRepository } from "../repository/users.repository";

interface Jwt {
  id: number;
}

export const protectRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as Jwt;
    if (!decoded) {
      return res.status(401).json({ message: "Não autorizado" });
    }

    const isUser = await getUsersRepository({ field: "id", id: decoded.id });
    if (!isUser) {
      return res.status(401).json({ message: "Não autorizado" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Não autorizado" });
  }
};
