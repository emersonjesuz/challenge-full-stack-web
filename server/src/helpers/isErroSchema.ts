import z from "zod";

// checks if the error was caused by zod schema and deals with it
export const isErroSchema = (error: any) => {
  if (error instanceof z.ZodError) {
    return {
      message: error.issues[0].message,
    };
  } else {
    return {
      message: error.message,
    };
  }
};
