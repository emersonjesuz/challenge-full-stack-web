<script lang="ts" setup>
interface Props {
  toggle: Boolean;
}

const props = defineProps<Props>();
</script>
<template>
  <!--toggles the arrow up or down icon -->
  <i v-if="!props.toggle" id="change-arrow-icon" class="pi pi-angle-down"></i>
  <i v-else id="change-arrow-icon" class="pi pi-angle-up"></i>
</template>
<style scoped>
#change-arrow-icon {
  cursor: pointer;
}
</style>
