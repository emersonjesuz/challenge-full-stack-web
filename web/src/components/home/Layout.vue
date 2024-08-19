<script lang="ts" setup></script>
<template>
  <div class="home-main-layout">
    <div class="home-main-layout-title">
      <h2>Consulte seus alunos</h2>
    </div>
    <div class="home-main-layout-box">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.home-main-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  border-radius: 0.3rem 0.3rem 0 0;
}
.home-main-layout-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  background-color: #e9e9e9;
  border-bottom: 1px solid black;
  border-radius: 0.3rem 0.3rem 0 0;
}
.home-main-layout-title h2 {
  font-family: "Roboto", sans-serif;
}
.home-main-layout-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
