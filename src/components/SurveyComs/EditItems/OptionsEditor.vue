<template>
  <div :key="props.id">
    <div class="mb-10 flex align-items-center">
      <span class="mr-10">选项</span>
      <ElButton size="small" :icon="Plus" type="primary" @click="addOption"></ElButton>
    </div>
    <div class="option">
      <div class="mb-5 flex align-items-center" v-for="(item, index) in status" :key="index">
        <ElInput :value="item" v-model="options[index]" class="mr-8" />
        <ElButton
          size="small"
          type="danger"
          circle
          :icon="Minus"
          @click="removeOption(index)"
        ></ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef, inject } from 'vue';
import { ElButton, ElInput } from 'element-plus';
import type { UpdateStatus } from '@/types';
import { Plus, Minus } from '@element-plus/icons-vue';
const props = defineProps<{ status: Array<string>; configKey: string; id: string }>();

const options = toRef(props, 'status');

const updateStatus = inject<UpdateStatus>('updateStatus');

const addOption = () => {
  if (updateStatus) {
    updateStatus(props.configKey);
  }
};

const removeOption = (index: number) => {
  if (updateStatus) {
    updateStatus(props.configKey, index);
  }
};

// const inputHandle = (index: number, newVal: string) => {
//   if (updateStatus) {
//     updateStatus(props.configKey, newVal);
//   }
// };
</script>

<style scoped></style>
