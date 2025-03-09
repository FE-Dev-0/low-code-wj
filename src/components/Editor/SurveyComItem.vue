<template>
  <ElButton text bg tag="a" @click="addCom">{{ comName }}</ElButton>
</template>

<script setup lang="ts">
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap';
import { useEditor } from '@/stores/useEditor';
import type { ComStatus, Material } from '@/types';
import { ElButton } from 'element-plus';
const props = defineProps(['materialName', 'comName']);

const store = useEditor();

const addCom = () => {
  const status = defaultStatusMap[props.materialName as Material]() as ComStatus;
  store.addCom(status);
};
</script>

<style scoped></style>
