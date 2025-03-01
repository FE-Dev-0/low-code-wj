<template>
  <div class="flex space-between align-items-center">
    {{ configKey === 'titleSize' ? '标题' : '描述' }}尺寸
    <span class="desc-text mr-20"> {{ status[currentStatus] }} px </span>
    <ElRadioGroup v-model="fontSize" @change="changHandle">
      <ElRadioButton v-for="(itme, index) in status" :key="index" :value="index">
        <font-awesome-icon icon="font" :size="getSize(index)" />
      </ElRadioButton>
    </ElRadioGroup>
  </div>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadioButton } from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { inject, ref } from 'vue';
import type { UpdateStatus } from '@/types';
const props = defineProps<{
  status: string;
  configKey: string;
  id: string;
  currentStatus: number;
}>();

const getSize = (index: number) => {
  if (index === 0) return 'sm';
  else if (index === 1) return 'xs';
  else return '2xs';
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
