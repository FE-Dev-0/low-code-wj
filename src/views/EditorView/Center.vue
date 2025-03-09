<template>
  <div class="center-container">
    <div v-for="(com, index) in store.coms" :key="index" @click="clickHandle(index)">
      <component :is="com.type" :status="com.status"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditor } from '@/stores/useEditor';

const store = useEditor();

const clickHandle = (index: number) => {
  if (store.currentComIndex === index) {
    store.setCurrentComponentIndex(-1);
  } else {
    store.setCurrentComponentIndex(index);
  }
};
</script>

<style scoped lang="scss">
.center-container {
  border: 1px solid var(--border-color);
  height: 100%;
  box-sizing: border-box;
  border-radius: var(--border-radius-base);
  padding: 20px;
  background-color: var(--white);
}
</style>
