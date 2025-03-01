<template>
  <div class="flex space-between align-items-center">
    <span>
      居中位置
      <span class="desc-text ml-20">
        {{ status[currentStatus] }}
      </span>
    </span>
    <ElRadioGroup v-model="currentStatus" @change="inputHandle">
      <ElRadioButton v-for="(item, index) in status" :key="index" :value="index">
        <font-awesome-icon :icon="getIcon(index)" />
      </ElRadioButton>
    </ElRadioGroup>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { ElRadioButton, ElRadioGroup } from 'element-plus';
import type { UpdateStatus } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps<{
  status: string;
  configKey: string;
  id: string;
  currentStatus: number;
}>();

const getIcon = (index: number) => {
  if (index === 0) return 'align-left';
  else if (index === 1) return 'align-center';
  else return 'align-right';
};

const currentStatus = ref(props.currentStatus);

const updateStatus = inject<UpdateStatus>('updateStatus');

const inputHandle = (newVal: unknown) => {
  if (updateStatus) {
    updateStatus(props.configKey, newVal as number);
  }
};
</script>

<style scoped></style>
