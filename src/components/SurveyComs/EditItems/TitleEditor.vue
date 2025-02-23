<template>
  <div :key="props.id">
    <div class="mb-10">标题内容</div>
    <ElInput placeholder="请输入题目标题" v-model="text" @update:modelValue="inputHandle" />
  </div>
</template>

<script setup lang="ts">
import { toRef, inject } from 'vue';
import { ElInput } from 'element-plus';
import type { UpdateStatus } from '@/types';

const props = defineProps<{ status: string; configKey: string; id: string }>();

const text = toRef(props, 'status');

const updateStatus = inject<UpdateStatus>('updateStatus');

const inputHandle = (newVal: string) => {
  if (updateStatus) {
    updateStatus(props.configKey, newVal);
  }
};
</script>

<style scoped></style>
