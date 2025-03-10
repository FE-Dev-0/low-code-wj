<template>
  <h1
    v-if="computedState.type === 0"
    class="pt-10 pb-10 text-center font-weight-200"
    :class="{
      'font-italic': computedState.titleItalic,
      'font-bold': !computedState.titleWeight,
    }"
    :style="{
      fontSize: computedState.titleSize + 'px',
      color: computedState.titleColor,
    }"
  >
    {{ computedState.title }}
  </h1>
  <p
    v-else
    :class="{
      'font-italic': computedState.descItalic,
      'font-bold': !computedState.descWeight,
    }"
    :style="{
      textAlign: getItemAlign(computedState.position),
      fontSize: computedState.descSize + 'px',
      color: computedState.descColor,
    }"
  >
    {{ computedState.desc }}
  </p>
</template>

<script setup lang="ts">
import type { TypeStatus } from '@/types';
import { getCurrentStatus, getStringStatusByCurrentStatus, getTextStatus } from '@/utils';
import { computed } from 'vue';
const props = defineProps<{
  status: TypeStatus;
  serialNum: number;
}>();

const computedState = computed(() => {
  return {
    title: getTextStatus(props.status.title),
    desc: getTextStatus(props.status.desc),
    type: getCurrentStatus(props.status.type),
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
