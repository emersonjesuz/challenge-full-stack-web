<script setup lang="ts">
import { reactive, watch } from "vue";
import ChangeArrowIcon from "../ChangeArrowIcon.vue";
import { ref } from "vue";

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
const desserts = reactive([
  {
    registrationNumber: "2024001",
    name: "João Silva",
    cpf: "123.456.789-00",
  },
  {
    registrationNumber: "2024002",
    name: "Maria Oliveira",
    cpf: "987.654.321-00",
  },
  {
    registrationNumber: "2024003",
    name: "Carlos Souza",
    cpf: "456.789.123-00",
  },
  {
    registrationNumber: "2024004",
    name: "Ana Paula",
    cpf: "321.654.987-00",
  },
  {
    registrationNumber: "2024005",
    name: "Bruno Mendes",
    cpf: "789.123.456-00",
  },
  {
    registrationNumber: "2024006",
    name: "Fernanda Lima",
    cpf: "654.321.987-00",
  },
  {
    registrationNumber: "2024007",
    name: "Rafael Costa",
    cpf: "987.321.654-00",
  },
  {
    registrationNumber: "2024008",
    name: "Gabriela Pereira",
    cpf: "123.789.456-00",
  },
  {
    registrationNumber: "2024009",
    name: "Lucas Ferreira",
    cpf: "654.987.321-00",
  },
  {
    registrationNumber: "2024010",
    name: "Juliana Santos",
    cpf: "321.987.654-00",
  },
  {
    registrationNumber: "2024011",
    name: "Mateus Almeida",
    cpf: "789.654.123-00",
  },
  {
    registrationNumber: "2024012",
    name: "Amanda Rocha",
    cpf: "456.321.789-00",
  },
  {
    registrationNumber: "2024013",
    name: "Eduardo Matos",
    cpf: "123.654.987-00",
  },
  {
    registrationNumber: "2024014",
    name: "Bianca dsdsds sdsd Ribeiro",
    cpf: "987.123.654-00",
  },
  {
    registrationNumber: "2024015",
    name: "Rodrigo Barros",
    cpf: "321.789.123-00",
  },
  {
    registrationNumber: "2024016",
    name: "Larissa Carvalho",
    cpf: "654.123.987-00",
  },
]);

// will handle the table filter
function manipulateTableFilter(by: "registrationNumber" | "name" | "cpf") {
  filterBy.value = filterBy.value.map((item) => {
    if (item.by === by) {
      item.ascendingOrder = !item.ascendingOrder;
    }
    return item;
  });
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
        <tr v-if="desserts.length" v-for="item in desserts" :key="item.name">
          <td>{{ item.registrationNumber }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.cpf }}</td>
          <!-- edit and delete buttons-->
          <td class="home-main-list-students-table-buttons">
            <v-btn
              variant="text"
              type="button"
              id="list-students-table-first-button"
            >
              Editar
            </v-btn>
            <v-btn
              variant="text"
              type="button"
              id="list-students-table-second-button"
            >
              Excluir
            </v-btn>
          </td>
        </tr>
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
  height: calc(100% - 17.22rem);
  border: 1px solid black;
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
#list-students-table-second-button {
  background-color: #ffffff;
  color: #ff203b;
}
</style>
