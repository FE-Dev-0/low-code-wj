<template>
  <div>
    <MaterialsHeader :title="computedState.title" :desc="computedState.desc" />
    <div class="radio-group">
      <el-radio-group>
        <el-radio :value="1">选项1</el-radio>
        <el-radio :value="2">选项2</el-radio>
        <el-radio :value="3">选项3</el-radio>
        <el-radio :value="4">选项4</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import MaterialsHeader from '@/components/SurveyComs/Common/MaterialsHeader.vue';
import type { OptionsStatus } from '@/types';
import { getTextStatus } from '@/utils';
import { computed } from 'vue';

const props = defineProps<{
  status: OptionsStatus;
  serialNum: number;
}>();

const computedState = computed(() => {
  return {
    title: getTextStatus(props.status.title),
    desc: getTextStatus(props.status.desc),
  };
});
</script>

<style scoped></style>
