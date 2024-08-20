import z from "zod";

interface Error {
  field: string;
  message: string;
}

// checks if the error was caused by zod schema and deals with it
export const isErroSchema = (error: any) => {
  if (error instanceof z.ZodError) {
    const errors: Error[] = [];
    error.issues.forEach((issue) => {
      errors.push({
        field: issue.path[0].toString(),
        message: issue.message,
      });
    });
    return errors;
  } else {
    return {
      message: error.message,
    };
  }
};
