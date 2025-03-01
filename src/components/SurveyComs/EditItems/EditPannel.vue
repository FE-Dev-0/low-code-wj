<template>
  <div v-for="(item, key) in com.status" :key="item.id" class="mb-20">
    <component v-if="item.isShow" :is="item.editCom" :config-key="key" v-bind="item"></component>
  </div>
</template>

<script setup lang="ts">
import { type ComStatus } from '@/types';

defineProps<{ com: ComStatus }>();
</script>

<style scoped></style>
