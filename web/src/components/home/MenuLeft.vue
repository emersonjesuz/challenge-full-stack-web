<script lang="ts" setup>
import { ref } from "vue";
const selectedMenuButton = ref(true);
</script>
<template>
  <div class="home-main-menu-left">
    <div class="home-main-menu-left-title">
      <h1>Modulo Acadêmico</h1>
    </div>
    <div class="home-main-menu-left-options">
      <v-btn
        type="button"
        :class="
          !selectedMenuButton
            ? 'activateSelectedMenuButton'
            : ' disableSelectedMenuButton'
        "
      >
        Alunos
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.home-main-menu-left {
  width: 20%;
  height: 100%;
}
.home-main-menu-left-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 0.4rem);
  height: 3.6rem;
  margin-top: 0.4rem;
  margin-left: 0.4rem;
  background-color: rgb(70, 70, 70);
}
.home-main-menu-left-title h1 {
  font-size: 1.3rem;
  color: white;
}
.home-main-menu-left-options {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 4rem);
  border: 1px solid black;
}
.home-main-menu-left-options button {
  width: 100%;
  height: 2.6rem;
  border-radius: 0px;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  text-transform: capitalize;
}
.activateSelectedMenuButton {
  background-color: #f2f2f2;
  color: rgb(0, 0, 0);
}
.disableSelectedMenuButton {
  background-color: #00a0a6;
  color: #f2f2f2;
}
</style>
