<template>
  <div :style="{ 'text-align': getItemAlign(computedState.position) }">
    <MaterialsHeader
      :desc="computedState.desc"
      :title="computedState.title"
      :title-size="computedState.titleSize"
      :desc-size="computedState.descSize"
      :desc-weight="computedState.descWeight"
      :title-weight="computedState.titleWeight"
      :title-color="computedState.titleColor"
      :desc-color="computedState.descColor"
    />
    <div class="radio-group">
      <ElRadioGroup>
        <ElRadio v-for="(item, index) in computedState.options" :value="item" :key="index">{{
          item
        }}</ElRadio>
      </ElRadioGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import MaterialsHeader from '@/components/SurveyComs/Common/MaterialsHeader.vue';
import type { OptionsStatus } from '@/types';
import {
  getCurrentStatus,
  getStringStatus,
  getStringStatusByCurrentStatus,
  getTextStatus,
} from '@/utils';
import { ElRadio, ElRadioGroup } from 'element-plus';
import { computed } from 'vue';

const props = defineProps<{
  status: OptionsStatus;
  serialNum: number;
}>();

const computedState = computed(() => {
  return {
    title: getTextStatus(props.status.title),
    desc: getTextStatus(props.status.desc),
    options: getStringStatus(props.status.options),
    position: getCurrentStatus(props.status.position),
    descWeight: getCurrentStatus(props.status.descWeight),
    titleWeight: getCurrentStatus(props.status.titleWeight),
    titleItalic: getCurrentStatus(props.status.titleItalic),
    descItalic: getCurrentStatus(props.status.descItalic),
    titleSize: getStringStatusByCurrentStatus(props.status.titleSize),
    descSize: getStringStatusByCurrentStatus(props.status.descSize),
    titleColor: getTextStatus(props.status.titleColor),
    descColor: getTextStatus(props.status.descColor),
  };
});

const getItemAlign = (position: number) => {
  if (position === 1) {
    return 'center';
  } else if (position === 2) {
    return 'right';
  } else {
    return 'left';
  }
};
</script>

<style scoped></style>
