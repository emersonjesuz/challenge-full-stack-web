import { Request, Response } from "express";
import { z } from "zod";
import { isErroSchema } from "../../helpers/isErroSchema";
import {
  createStudentRepository,
  getStudentsRepository,
} from "../../repository/student.repository";

export const createStudentController = async (req: Request, res: Response) => {
  try {
    // zod validation for create student
    const createStudentSchema = z.object({
      name: z.string({ message: "O nome é obrigatório" }),
      email: z
        .string({ message: "Email e obrigatório" })
        .email({ message: "Email invalido" }),
      registrationNumber: z.number({
        message: "O Registro Academico é obrigatório",
      }),
      cpf: z
        .string({ message: "CPF é obrigatório" })
        .min(11, { message: "CPF invalido" }),
    });
    const data = createStudentSchema.parse(req.body);

    const isStudent = await getStudentsRepository(data.registrationNumber);
    // checks if the student exists
    if (isStudent) {
      return res.status(400).json({ message: "Aluno ja existe" });
    }

    // create student in database
    const createdStudent = await createStudentRepository(data);

    return res.status(201).json(createdStudent);
  } catch (error) {
    return res.status(400).json(isErroSchema(error));
  }
};
