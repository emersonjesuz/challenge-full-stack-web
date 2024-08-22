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

    const isStudentRegistrationNumber = await getStudentsRepository(
      data.registrationNumber
    );
    // checks if the student exists for registration number
    if (Object.keys(isStudentRegistrationNumber!).length) {
      return res
        .status(400)
        .json({ message: "Já existe um aluno com este Registro" });
    }

    const isStudentCpf = await getStudentsRepository(undefined, data.cpf);
    // checks if the student exists for cpf
    if (Object.keys(isStudentCpf!).length) {
      return res
        .status(400)
        .json({ message: "Já existe um aluno com este CPF" });
    }

    // create student in database
    const createdStudent = await createStudentRepository(data);

    return res.status(201).json(createdStudent);
  } catch (error) {
    return res.status(400).json(isErroSchema(error));
  }
};
