<script setup lang="ts">
import { apiBack } from "@/config/axios";
import notifyError from "@/helpers/notifyError";
import { useShow } from "@/piniaStore/show";
import { useStudentData } from "@/piniaStore/studentData";
import { onMounted, ref } from "vue";

const initialState = {
  registrationNumber: "",
  name: "",
  cpf: "",
  email: "",
};

const state = ref({
  ...initialState,
});

const show = useShow();
const useStudent = useStudentData();

async function onSubmit() {
  try {
    //  send to edit
    if (useStudent.getStudent.registrationNumber) {
      await apiBack.put(
        `/students/${useStudent.getStudent.registrationNumber}`,
        {
          name: state.value.name,
          email: state.value.email,
        }
      );

      useStudent.editStudent(state.value);
      show.displaySnackbar({
        active: true,
        text: "Aluno editado com sucesso!",
        type: "Success",
      });
    } else {
      //  send to add
      await apiBack.post("/students", {
        ...state.value,
        registrationNumber: Number(state.value.registrationNumber),
      });

      useStudent.addStudent(state.value);
      show.displaySnackbar({
        active: true,
        text: "Aluno adicionado com sucesso!",
        type: "Success",
      });
    }

    clear();
  } catch (error) {
    notifyError(error);
  }
}

// clean the form
function clear() {
  state.value = { ...initialState };
  show.toggleActivateStudentForm(false);
  useStudent.findStudent({
    cpf: "",
    email: "",
    name: "",
    registrationNumber: "",
  });
}

// just allow the number to pass
function onlyNumbers() {
  const regex = /[^0-9]/g;
  state.value.registrationNumber = state.value.registrationNumber.replace(
    regex,
    ""
  );
}

// format input cpf
function formatCpf() {
  state.value.cpf = state.value.cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

// add student in form
onMounted(() => {
  state.value = { ...useStudent.getStudent };
});
</script>
<template>
  <form @submit.prevent="onSubmit" class="home-main-layout-form-estudant">
    <v-text-field
      v-model="state.name"
      label="Nome"
      variant="underlined"
      placeholder="Informe o nome completo"
      required
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      label="E-mail"
      type="email"
      variant="underlined"
      placeholder="Informe apenas um e-mail"
      required
    ></v-text-field>
    <v-text-field
      class="form-estudant-input"
      label="Registro Acadêmico"
      placeholder="Informe o registro acadêmico"
      v-model="state.registrationNumber"
      @input="onlyNumbers()"
      variant="underlined"
      :disabled="useStudent.getStudent.registrationNumber ? true : false"
      required
    ></v-text-field>
    <v-text-field
      v-model="state.cpf"
      label="CPF"
      @input="formatCpf()"
      variant="underlined"
      placeholder="Informe o numero do documento"
      :disabled="useStudent.getStudent.registrationNumber ? true : false"
      required
    ></v-text-field>

    <div class="home-main-layout-form-estudant-buttons">
      <v-btn variant="tonal" @click="clear"> Cancelar </v-btn>
      <v-btn type="submit" variant="tonal"> Salvar </v-btn>
    </div>
  </form>
</template>

<style scoped>
.home-main-layout-form-estudant {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.home-main-layout-form-estudant-buttons {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
  width: 100%;
  height: 10rem;
}
.home-main-layout-form-estudant-buttons button {
  width: 10rem;
}
.home-main-layout-form-estudant-buttons button:first-child {
  background-color: #ffffff;
  color: #00a0a6;
}
.home-main-layout-form-estudant-buttons button:last-child {
  background-color: #ff203b;
  color: #ffffff;
}
</style>
