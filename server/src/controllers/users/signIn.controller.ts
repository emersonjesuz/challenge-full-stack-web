import { Response, Request } from "express";
import z from "zod";
import { getUsersRepository } from "../../repository/users.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { isErroSchema } from "../../helpers/isErroSchema";

export const signInController = async (req: Request, res: Response) => {
  try {
    const signInSchema = z.object({
      email: z
        .string({ message: "Email obrigatório" })
        .email({ message: "Email invalido" }),
      password: z.string({ message: "Senha obrigatória" }),
    });

    const data = signInSchema.parse(req.body);

    const isUser = await getUsersRepository({
      field: "email",
      email: data.email,
    });
    // verify if user exists
    if (!Object.keys(isUser).length) {
      return res.status(404).json({ message: "Usuario nao encontrado" });
    }

    const comparePassword = await bcrypt.compare(
      data.password,
      isUser.password
    );
    //  verify if password is correct
    if (!comparePassword) {
      return res.status(400).json({ message: "Email ou senha invalida" });
    }

    // generate token
    const token = jwt.sign({ id: isUser.id }, process.env.SECRET_KEY!, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(400).json(isErroSchema(error));
  }
};
