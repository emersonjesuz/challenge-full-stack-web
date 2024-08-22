import { Response, Request } from "express";
import {
  deleteStudentRepository,
  getStudentsRepository,
} from "../../repository/student.repository";

export const deleteStudentsController = async (req: Request, res: Response) => {
  const { registrationNumber } = req.params;

  try {
    if (!registrationNumber || isNaN(parseInt(registrationNumber))) {
      return res
        .status(400)
        .json({ message: "O Registro Academico é obrigatório" });
    }

    const data = await getStudentsRepository(parseInt(registrationNumber));
    // checks if the student exists
    if (!Object.keys(data!).length) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    // delete student in database
    const deletedStudent = await deleteStudentRepository(
      parseInt(registrationNumber)
    );

    return res.status(200).json(deletedStudent);
  } catch (error) {
    return res.status(400).json(error);
  }
};
