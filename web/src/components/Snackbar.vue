<script setup lang="ts">
import { ref } from "vue";
import { useShow } from "@/piniaStore/show";

const show = useShow();
</script>
<template>
  <v-snackbar
    v-model="show.showSnackbar.active"
    :timeout="3000"
    :color="show.showSnackbar.type === 'Success' ? '#26A69A' : '#F44336'"
    variant="elevated"
  >
    {{ show.showSnackbar.text }}
  </v-snackbar>

  <!-- <v-btn
    @click="isSnackbarActive = true"
    class="ma-2"
    color="green-darken-3"
    variant="tonal"
    location="top right"
  >
    Open Snackbar
  </v-btn> -->
</template>
<!-- #26A69A -->
<!-- #F44336 -->
