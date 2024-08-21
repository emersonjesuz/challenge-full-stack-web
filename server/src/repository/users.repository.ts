import { poolDb } from "../config/database";

interface GetUserRepository {
  field: "id" | "email";
  id?: number;
  email?: string;
}

interface User {
  id: number;
  email: string;
  password: string;
}

export const getUsersRepository = async ({
  field,
  id,
  email,
}: GetUserRepository): Promise<User | any> => {
  try {
    if (!id && !email) {
      throw new Error("informe o id ou o email");
    }

    let response = null;
    // search user by id
    if (field === "id") {
      response = await poolDb.query("SELECT * FROM users WHERE id = $1", [id]);
    }

    // search for user by email
    if (field === "email") {
      response = await poolDb.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
    }
    console.log("email", email);
    console.log("id", id);
    console.log("field", field);

    console.log("response", response!.rows);
    const data = response!.rows[0];
    return {
      id: data.id,
      email: data.email,
      password: data.password,
    };
  } catch (error) {
    return error;
  }
};
