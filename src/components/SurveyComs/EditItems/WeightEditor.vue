<template>
  <div class="flex align-items-center space-between">
    <span>
      {{ configKey === 'titleWeight' ? '标题' : '描述' }}粗细
      <span class="desc-text ml-20">
        {{ status[currentStatus] }}
      </span>
    </span>

    <ElRadioGroup v-model="fontSize" @change="changHandle">
      <ElRadioButton v-for="(item, index) in status" :key="index" :value="index">
        <span :style="{ fontWeight: boldValue(index) }">B</span>
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

const boldValue = (index: number) => {
  if (index === 0) {
    return 'bold';
  }
  return 'normal';
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
