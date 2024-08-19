<template>
  <div class="home-main-search">
    <v-form class="home-main-search-form">
      <!-- <v-container class="pa-0"> -->
      <v-text-field variant="outlined" class="home-main-search-input">
        <template v-slot:label>
          <span> Digite sua busca </span>
        </template>
        <v-btn type="button" class="home-main-search-button"> Pesquisar </v-btn>
      </v-text-field>
      <!-- </v-container> -->
    </v-form>
  </div>
</template>

<style scoped>
.home-main-search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  padding: 0.5rem;
}
.home-main-search-form {
  display: flex;
  align-items: start;
  justify-content: start;
  height: 3rem;
  width: 100%;
  padding: 0;
}
.home-main-search-input {
  position: relative;
  height: 3rem;
}
.home-main-search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  height: 3.5rem;
  padding: 0px 1.5rem;
  border-radius: 0px;
  border-left: 1px solid #cecece;
  background-color: #d6d6d6;
  box-shadow: none;
  z-index: 3;
}
</style>
