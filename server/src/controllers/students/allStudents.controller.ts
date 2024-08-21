import { Response, Request } from "express";
import {
  allStudentsRepository,
  searchStudentRepository,
} from "../../repository/student.repository";

interface Query {
  by: string;
  type: string;
  search: string;
}

export const allStudentsController = async (req: Request, res: Response) => {
  const { by, type, search } = req.query;
  try {
    // search field
    if (search) {
      // search for student registration number, name or cpf
      const data = await searchStudentRepository(search.toString());
      return res.status(200).json(data);
    }

    if (!by || !type) {
      return res
        .status(400)
        .json({ message: "O campo de ordenação é obrigatório" });
    }

    // sort the fields
    if (type.toString() !== "ASC" && type.toString() !== "DESC") {
      return res
        .status(400)
        .json({ message: "O tipo de ordenação é obrigatório" });
    }

    if (
      by.toString() !== "name" &&
      by.toString() !== "cpf" &&
      by.toString() !== "registrationNumber"
    ) {
      return res
        .status(400)
        .json({ message: "O campo de ordenação é obrigatório" });
    }

    const orderingField = by.toString() as
      | "name"
      | "cpf"
      | "registrationNumber";
    const sortingType = type.toString() as "ASC" | "DESC";

    // get all students from database
    const data = await allStudentsRepository({
      by: orderingField,
      type: sortingType,
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};
