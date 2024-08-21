import { Router } from "express";
import { createStudentController } from "./controllers/students/createStudent.controller";
import { getStudentController } from "./controllers/students/getStudent.controller";
import { allStudentsController } from "./controllers/students/allStudents.controller";
import { editStudentController } from "./controllers/students/editStudent.controller";
import { deleteStudentsController } from "./controllers/students/deleteStudents.controller";

export const router = Router();

router.post("/students", createStudentController);
router.get("/students/:registrationNumber", getStudentController);
router.get("/students", allStudentsController);
router.put("/students/:registrationNumber", editStudentController);
router.delete("/students/:registrationNumber", deleteStudentsController);
