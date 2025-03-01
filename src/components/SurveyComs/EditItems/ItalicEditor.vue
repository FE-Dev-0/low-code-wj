<template>
  <div class="flex align-items-center space-between">
    <div>
      {{ configKey === 'titleItalic' ? '标题' : '描述' }}倾斜
      <span class="desc-text ml-20"> {{ status[currentStatus] }} </span>
    </div>
    <ElRadioGroup v-model="fontSize" @change="changHandle">
      <ElRadioButton v-for="(item, index) in status" :key="index" :value="index">
        <span :style="{ fontStyle: fontStyleValue(index) }" style="font-family: serif"> I </span>
      </ElRadioButton>
    </ElRadioGroup>
  </div>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadioButton } from 'element-plus';

import { inject, ref } from 'vue';
import type { UpdateStatus } from '@/types';
const props = defineProps<{
  status: string;
  configKey: string;
  id: string;
  currentStatus: number;
}>();

const fontStyleValue = (index: number) => {
  if (index === 0) {
    return 'normal';
  }
  return 'italic';
};

const updateStatus = inject<UpdateStatus>('updateStatus');

const changHandle = (newVal: unknown) => {
  if (updateStatus) {
    updateStatus(props.configKey, newVal as number);
  }
};

const fontSize = ref(props.currentStatus);
</script>

<style scoped></style>
