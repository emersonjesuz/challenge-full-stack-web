import { poolDb } from "../config/database";

interface Student {
  name: string;
  email: string;
  cpf: string;
  registrationNumber: number;
}
interface SortStundentBy {
  by: "name" | "cpf" | "registrationNumber";
  type: "DESC" | "ASC";
}

// create student in database
export const createStudentRepository = async (student: Student) => {
  try {
    const params = [
      student.name,
      student.email,
      student.cpf,
      student.registrationNumber,
    ];
    const response = await poolDb.query(
      "INSERT INTO student (name, email, cpf, registration_number) VALUES ($1, $2, $3, $4) RETURNING *",
      params
    );

    const data = response.rows[0];

    return {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      registrationNumber: data.registration_number,
    };
  } catch (error) {
    return error;
  }
};

// get student from database
export const getStudentsRepository = async (
  registrationNumber?: number,
  cpf?: string
) => {
  try {
    if (!cpf && !registrationNumber) {
      return {};
    }
    let response: { rows: any[] } = { rows: [] };
    if (registrationNumber) {
      response = await poolDb.query(
        "SELECT * FROM student WHERE registration_number = $1 ",
        [registrationNumber]
      );
    } else {
      response = await poolDb.query("SELECT * FROM student WHERE cpf = $1 ", [
        cpf,
      ]);
    }

    if (!response.rows.length) {
      return {};
    }

    const data = response.rows[0];

    return {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      registrationNumber: data.registration_number,
    };
  } catch (error) {
    return error;
  }
};

// get all students
export const allStudentsRepository = async ({ by, type }: SortStundentBy) => {
  let response = null;
  try {
    if (by === "name") {
      response = await poolDb.query(`
        SELECT name, email, cpf, registration_number
        FROM student  
        ORDER BY name ${type}
      `);
    } else if (by === "cpf") {
      response = await poolDb.query(`
        SELECT name, email, cpf,  registration_number 
        FROM student  
        ORDER BY cpf ${type}
      `);
    } else {
      response = await poolDb.query(`
        SELECT name, email, cpf, registration_number 
        FROM student  
        ORDER BY registration_number ${type}
      `);
    }

    const data = response.rows.map(
      ({ name, email, cpf, registration_number }) => {
        return {
          name,
          email,
          cpf,
          registrationNumber: registration_number,
        };
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

// search for student registration number, name or cpf
export const searchStudentRepository = async (search: string) => {
  try {
    const response = await poolDb.query(
      `
      SELECT name, email, cpf, registration_number
      FROM student 
      WHERE name ILIKE $1 OR cpf ILIKE $1 OR CAST(registration_number AS TEXT) ILIKE $1
      ORDER BY name ASC;
    `,
      [`%${search}%`]
    );
    const data = response.rows.map(
      ({ name, email, cpf, registration_number }) => {
        return {
          name,
          email,
          cpf,
          registrationNumber: registration_number,
        };
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

// edit student in database
export const editStudentRepository = async (
  registrationNumber: number,
  student: Omit<Student, "registrationNumber" | "cpf">
) => {
  try {
    const { name, email } = student;
    const response = await poolDb.query(
      "UPDATE student SET name = $1, email = $2 WHERE registration_number = $3  RETURNING *",
      [name, email, registrationNumber]
    );
    const data = response.rows[0];
    return {
      name: data.name,
      email: data.email,
      registrationNumber: data.registration_number,
    };
  } catch (error) {
    return error;
  }
};

// delete student in database
export const deleteStudentRepository = async (registrationNumber: number) => {
  try {
    const response = await poolDb.query(
      "DELETE FROM student WHERE registration_number = $1 RETURNING *",
      [registrationNumber]
    );
    const data = response.rows[0];
    return {
      name: data.name,
      email: data.email,
      registrationNumber: data.registration_number,
    };
  } catch (error) {
    return error;
  }
};
