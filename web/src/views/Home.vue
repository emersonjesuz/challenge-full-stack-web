<script lang="ts" setup>
import ListOfStudents from "@/components/home/ListOfStudents.vue";
import Search from "@/components/home/Search.vue";
import { useShow } from "@/piniaStore/show";
import FormEstudant from "../components/home/FormEstudant.vue";
import Layout from "../components/home/Layout.vue";
import MenuLeft from "../components/home/MenuLeft.vue";

const showStore = useShow();
</script>
<template>
  <div class="container-home">
    <header class="home-logo">
      <!-- A+ logo -->
      <img
        src="https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg"
        alt=""
      />
    </header>
    <main class="home-main">
      <!-- component with left menu -->
      <MenuLeft />
      <Layout>
        <div
          v-if="!showStore.activateStudentForm"
          class="home-main-layout-search-and-list"
        >
          <div class="home-main-layout-search">
            <!-- student search component -->
            <Search />
            <!-- student registration button -->
            <v-btn
              @click="showStore.toggleActivateStudentForm(true)"
              type="button"
              class="home-main-search-button"
            >
              Cadastrar Aluno
            </v-btn>
          </div>
          <!-- component of the student list -->
          <ListOfStudents />
        </div>
        <div v-else class="home-main-layout-form">
          <FormEstudant />
        </div>
      </Layout>
    </main>
  </div>
</template>

<style scoped>
.container-home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 97.5vw;
  height: 100vh;
  padding: 0rem 2rem 2rem 2rem;
}
.home-logo {
  display: flex;
  align-items: center;
  width: 100%;
  height: 7rem;
  padding-left: 3rem;
}
.home-main {
  width: 100%;
  height: calc(100% - 7rem);
  display: flex;
}
.home-main-layout-search-and-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.home-main-layout-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 14rem;
  padding: 0 3rem;
}
.home-main-search-button {
  height: 3.5rem;
  margin: auto;
  transform: translateY(0.2rem);
  background-color: #ff203b;
  color: #ffffff;
}
.home-main-layout-form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
