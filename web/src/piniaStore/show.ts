import { defineStore } from "pinia";
interface ShowSnackBar {
  active: boolean;
  text: string;
  type: "Success" | "Error";
}

interface State {
  activateStudentForm: boolean;
  showSnackbar: ShowSnackBar;
}

export const useShow = defineStore("show", {
  state: (): State => ({
    activateStudentForm: false,
    showSnackbar: {
      active: false,
      text: "",
      type: "Success",
    },
  }),
  actions: {
    //will open or close the student form
    toggleActivateStudentForm(show: boolean) {
      this.activateStudentForm = show;
    },

    //will open or close the snackbar
    toggleShowSnackbar(show: ShowSnackBar) {
      this.showSnackbar = show;
    },
  },
});
