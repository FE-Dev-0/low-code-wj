<template>
  <Header :id="id"></Header>
  <div class="editor-container">
    <ElContainer style="height: 100%">
      <ElAside style="width: 350px">
        <LeftSide />
      </ElAside>
      <ElMain style="padding: 0; background-color: var(--white)" class="ml-20 mr-20">
        <Center></Center>
      </ElMain>
      <ElAside style="width: 350px">
        <RightSide></RightSide>
      </ElAside>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Common/Header.vue';
import { ElAside, ElContainer, ElMain } from 'element-plus';
import RightSide from './RightSide.vue';
import LeftSide from './LeftSide/index.vue';
import Center from './Center.vue';
import type { UpdateStatus } from '@/types';
import { computed, provide } from 'vue';
import { useEditor } from '@/stores/useEditor';
import {
  changeEditorIsShowStatus,
  isOptionProps,
  isOptionStatus,
  isTextProps,
  isTypeStatus,
  restoreComponentStatus,
} from '@/utils';
import { setCurrentStatus } from '@/stores/actions';
import { useRoute } from 'vue-router';
import { getSurveyById } from '@/db/operation';

const store = useEditor();
store.resetComs();
const route = useRoute();

const id = computed(() => {
  return route.params.id ? String(route.params.id) : '';
});

// 获取当前选中组件的状态数据
const currentCom = computed(() => store.coms[store.currentComIndex]);

if (id.value) {
  // 获取问卷
  getSurveyById(Number(id.value)).then((res) => {
    if (res) {
      restoreComponentStatus(res.coms);
      store.setStore(res);
    }
  });
}

const updateStatus: UpdateStatus = (configKey, payload) => {
  switch (configKey) {
    case 'type':
      if (typeof payload == 'number' && isTypeStatus(currentCom.value.status)) {
        changeEditorIsShowStatus(currentCom.value.status, payload);
        setCurrentStatus(currentCom.value.status.type, payload);
      }
      break;
    case 'title':
    case 'desc':
    case 'titleColor':
    case 'descColor':
      if (isTextProps(currentCom.value.status[configKey])) {
        store.setTextStatus(currentCom.value.status[configKey], payload as string);
      }
      break;
    case 'options':
      if (isOptionStatus(currentCom.value.status)) {
        store.setStringArrStatus(currentCom.value.status[configKey], payload as number | undefined);
      }
      break;
    case 'position':
    case 'titleSize':
    case 'descSize':
    case 'titleWeight':
    case 'descWeight':
    case 'titleItalic':
    case 'descItalic':
      if (isOptionProps(currentCom.value.status[configKey])) {
        store.setCurrentStatus(currentCom.value.status[configKey], payload as number);
      }
      break;
  }
};

provide('updateStatus', updateStatus);
</script>

<style scoped lang="scss">
.editor-container {
  padding: 20px;
  height: calc(100vh - 40px - 50px);
  background: url('@/assets/imgs/editor_background.png');
}
</style>
