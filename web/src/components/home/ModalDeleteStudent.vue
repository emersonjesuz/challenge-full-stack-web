<script setup lang="ts">
import { apiBack } from "@/config/axios";
import notifyError from "@/helpers/notifyError";
import { useShow } from "@/piniaStore/show";
import { useStudentData } from "@/piniaStore/studentData";
import { ref } from "vue";
interface Student {
  name: string;
  registrationNumber: string;
  cpf: string;
  email: string;
}
interface Props {
  student: Student;
}
const dialog = ref(false);
const props = defineProps<Props>();
const useStudent = useStudentData();
const show = useShow();

// delete student from list
async function deleteStudent() {
  try {
    await apiBack.delete(`/students/${props.student.registrationNumber}`);
    useStudent.deleteStudent(props.student);
    dialog.value = false;
    show.displaySnackbar({
      active: true,
      text: "Aluno excluído com sucesso!",
      type: "Success",
    });
  } catch (error) {
    notifyError(error);
  }
}
</script>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" max-width="500" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          variant="text"
          type="button"
          id="modal-delete-student-button"
          @click="dialog = true"
        >
          Excluir
        </v-btn>
      </template>

      <v-card
        variant="elevated"
        prepend-icon="mdi-map-marker"
        text="Você tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita."
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn
            id="modal-delete-student-button-cancel"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            id="modal-delete-student-button-confirm"
            @click="deleteStudent()"
          >
            Confirmar
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
#modal-delete-student-button {
  background-color: #ffffff;
  color: #ff203b;
}
#modal-delete-student-button-cancel {
  background-color: #ffffff;
  color: #00a0a6;
}
#modal-delete-student-button-confirm {
  background-color: #ffffff;
  color: #ff203a;
  margin-right: 1rem;
}
</style>
