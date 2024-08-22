<script setup lang="ts">
import { useShow } from "@/piniaStore/show";
import { useStudentData } from "@/piniaStore/studentData";
import { ref } from "vue";
import ChangeArrowIcon from "../ChangeArrowIcon.vue";
import ModalDeleteStudent from "./ModalDeleteStudent.vue";

interface Student {
  name: string;
  registrationNumber: string;
  cpf: string;
  email: string;
}
interface FilterBy {
  by: "name" | "cpf" | "registrationNumber";
  ascendingOrder: boolean;
  name: string;
}

const filterBy = ref<FilterBy[]>([
  {
    by: "registrationNumber",
    ascendingOrder: false,
    name: "Registro Acadêmico",
  },
  {
    by: "name",
    ascendingOrder: false,
    name: "Nome",
  },
  {
    by: "cpf",
    ascendingOrder: false,
    name: "CPF",
  },
]);

const useStudent = useStudentData();
const show = useShow();

// will handle the table filter
function manipulateTableFilter(by: "registrationNumber" | "name" | "cpf") {
  filterBy.value = filterBy.value.map((item) => {
    if (item.by === by) {
      item.ascendingOrder = !item.ascendingOrder;
      useStudent.orderList({
        orderBy: { by, type: !item.ascendingOrder ? "ASC" : "DESC" },
      });
      // clear search
      useStudent.searchStudentsList("");
    }
    return item;
  });
}

// display form to edit student
function showFormEditStudent(student: Student) {
  useStudent.findStudent(student);
  show.toggleActivateStudentForm(true);
}
</script>
<template>
  <div class="home-main-list-students">
    <v-table fixed-header class="home-main-list-students-table">
      <!-- table header -->
      <thead class="home-main-list-students-table-header">
        <!-- list with header attributes -->
        <tr>
          <th v-for="item in filterBy" :key="item.by" class="text-left">
            <button @click="manipulateTableFilter(item.by)">
              {{ item.name }}
              <ChangeArrowIcon :toggle="item.ascendingOrder" />
            </button>
          </th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="useStudent.listStudents.length"
          v-for="student in useStudent.listStudents"
          :key="student.registrationNumber"
        >
          <td>{{ student.registrationNumber }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.cpf }}</td>
          <!-- edit and delete buttons-->
          <td class="home-main-list-students-table-buttons">
            <!-- button edit -->
            <v-btn
              variant="text"
              type="button"
              id="list-students-table-first-button"
              @click="showFormEditStudent(student)"
            >
              Editar
            </v-btn>
            <!-- button that will display the modal -->
            <ModalDeleteStudent :student="student" />
          </td>
        </tr>
        <!-- will be displayed if the list is empty -->
        <tr v-else>
          <td colspan="4">Nenhum registro encontrado</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped>
.home-main-list-students {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 16.22rem);
  border-top: 1px solid black;
  border-radius: 0;
}
.home-main-list-students-table {
  width: 100%;
  height: 100%;
  border-radius: 0px;
}
.home-main-list-students-table-header {
  background-color: #cf1e1e;
}

.home-main-list-students-table-header th {
  background-color: transparent;
}

.home-main-list-students-table-buttons {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
}
#list-students-table-first-button {
  background-color: #ffffff;
  color: #00a0a6;
}
</style>
