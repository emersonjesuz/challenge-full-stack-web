import { Request, Response } from "express";

import { z } from "zod";
import { isErroSchema } from "../../helpers/isErroSchema";
import {
  editStudentRepository,
  getStudentsRepository,
} from "../../repository/student.repository";

export const editStudentController = async (req: Request, res: Response) => {
  try {
    const { registrationNumber } = req.params;
    // zod validation for edit student
    const editStudentSchema = z.object({
      name: z.string({ message: "O nome é obrigatório" }),
      email: z
        .string({ message: "Email e obrigatório" })
        .email({ message: "Email invalido" }),
    });

    const data = editStudentSchema.parse(req.body);

    if (!registrationNumber || isNaN(parseInt(registrationNumber))) {
      return res
        .status(400)
        .json({ message: "O Registro Academico é obrigatório" });
    }

    const isStudent = await getStudentsRepository(+registrationNumber);
    // checks if the student exists
    if (!Object.keys(isStudent!).length) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    // edit student in database
    const editedStudent = await editStudentRepository(
      +registrationNumber,
      data
    );

    return res.status(200).json(editedStudent);
  } catch (error) {
    return res.status(400).json(isErroSchema(error));
  }
};
