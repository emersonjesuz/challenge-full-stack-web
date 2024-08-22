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
</template>
