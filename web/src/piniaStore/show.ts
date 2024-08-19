import { defineStore } from "pinia";

export const useShow = defineStore("show", {
  state: () => ({
    activateStudentForm: false,
  }),
  actions: {
    //will open or close the student form
    toggleActivateStudentForm(show: boolean) {
      this.activateStudentForm = show;
    },
  },
});
