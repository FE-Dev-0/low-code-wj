<template>
  <div class="flex align-items-center space-between">
    <span>
      {{ configKey === 'titleItalic' ? '标题' : '描述' }}颜色
      <span class="desc-text ml-20"> {{}} </span>
    </span>
    <ElColorPicker v-model="color" @change="changeHandle"></ElColorPicker>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import type { UpdateStatus } from '@/types';
import { ElColorPicker } from 'element-plus';
const props = defineProps<{
  status: string;
  configKey: string;
  id: string;
}>();

const color = ref(props.status);

const updateStatus = inject<UpdateStatus>('updateStatus');

const changeHandle = (newVal: unknown) => {
  if (updateStatus) {
    updateStatus(props.configKey, newVal as string);
  }
};
</script>

<style scoped></style>
