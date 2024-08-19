import { defineStore } from "pinia";

interface Student {
  name: string;
  registrationNumber: string;
  cpf: string;
  email: string;
}

interface State {
  getStudent: Student;
  listStudents: Student[];
}

export const useStudentData = defineStore("student", {
  state: (): State => ({
    getStudent: {
      name: "",
      registrationNumber: "",
      cpf: "",
      email: "",
    },
    listStudents: [
      {
        registrationNumber: "2024001",
        name: "João Silva",
        cpf: "123.456.789-00",
        email: "joao.silva@example.com",
      },
      {
        registrationNumber: "2024002",
        name: "Maria Oliveira",
        cpf: "987.654.321-00",
        email: "maria.oliveira@example.com",
      },
      {
        registrationNumber: "2024003",
        name: "Carlos Souza",
        cpf: "456.789.123-00",
        email: "carlos.souza@example.com",
      },
      {
        registrationNumber: "2024004",
        name: "Ana Paula",
        cpf: "321.654.987-00",
        email: "ana.paula@example.com",
      },
      {
        registrationNumber: "2024005",
        name: "Bruno Mendes",
        cpf: "789.123.456-00",
        email: "bruno.mendes@example.com",
      },
      {
        registrationNumber: "2024006",
        name: "Fernanda Lima",
        cpf: "654.321.987-00",
        email: "fernanda.lima@example.com",
      },
      {
        registrationNumber: "2024007",
        name: "Rafael Costa",
        cpf: "987.321.654-00",
        email: "rafael.costa@example.com",
      },
      {
        registrationNumber: "2024008",
        name: "Gabriela Pereira",
        cpf: "123.789.456-00",
        email: "gabriela.pereira@example.com",
      },
      {
        registrationNumber: "2024009",
        name: "Lucas Ferreira",
        cpf: "654.987.321-00",
        email: "lucas.ferreira@example.com",
      },
      {
        registrationNumber: "2024010",
        name: "Juliana Santos",
        cpf: "321.987.654-00",
        email: "juliana.santos@example.com",
      },
      {
        registrationNumber: "2024011",
        name: "Mateus Almeida",
        cpf: "789.654.123-00",
        email: "mateus.almeida@example.com",
      },
      {
        registrationNumber: "2024012",
        name: "Amanda Rocha",
        cpf: "456.321.789-00",
        email: "amanda.rocha@example.com",
      },
      {
        registrationNumber: "2024013",
        name: "Eduardo Matos",
        cpf: "123.654.987-00",
        email: "eduardo.matos@example.com",
      },
      {
        registrationNumber: "2024014",
        name: "Bianca Ribeiro",
        cpf: "987.123.654-00",
        email: "bianca.ribeiro@example.com",
      },
      {
        registrationNumber: "2024015",
        name: "Rodrigo Barros",
        cpf: "321.789.123-00",
        email: "rodrigo.barros@example.com",
      },
      {
        registrationNumber: "2024016",
        name: "Larissa Carvalho",
        cpf: "654.123.987-00",
        email: "larissa.carvalho@example.com",
      },
    ],
  }),
  actions: {
    // add student to list
    addStudent(student: Student) {
      this.listStudents.push(student);
    },

    // pick a student from the list
    findStudent(student: Student) {
      this.getStudent = student;
    },

    // add complete list with all students
    allStudents(list: Student[]) {
      this.listStudents = list;
    },

    // edit student
    editStudent(student: Student) {
      this.listStudents.map(({ name, email }) => {
        if (student.registrationNumber === student.registrationNumber) {
          return {
            ...student,
            name,
            email,
          };
        }
        return student;
      });
    },

    // delete student from list
    deleteStudent(student: Student) {
      this.listStudents = this.listStudents.filter(
        ({ registrationNumber }) =>
          registrationNumber !== student.registrationNumber
      );
    },
  },
});
