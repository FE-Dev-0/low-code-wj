<template>
  <ElContainer class="layout-container">
    <ElAside class="aside-left">
      <slot></slot>
    </ElAside>
    <ElMain>
      <RouterView v-slot="{ Component }">
        <component :is="Component" :status="currentCom.status" :serialNum="1" />
      </RouterView>
    </ElMain>
    <ElAside class="aside-right">
      <EditPannel :com="currentCom" />
    </ElAside>
  </ElContainer>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import { ElContainer, ElAside, ElMain } from 'element-plus';
import { useMaterialStore } from '@/stores/useMaterials';
import EditPannel from '@/components/SurveyComs/EditItems/EditPannel.vue';
import type { MaterialStore, UpdateStatus } from '@/types';

const store = useMaterialStore() as unknown as MaterialStore;
// 获取当前选中组件的状态数据
const currentCom = computed(() => store.coms[store.currentMaterialCom]);

const updateStatus: UpdateStatus = (configKey, payload) => {
  switch (configKey) {
    case 'title':
    case 'desc':
    case 'titleColor':
    case 'descColor':
      store.setTextStatus(
        currentCom.value.status[configKey as 'title' | 'desc' | 'titleColor' | 'descColor'],
        payload as string,
      );
      break;
    case 'options':
      store.setStringArrStatus(
        currentCom.value.status[configKey as 'options'],
        payload as number | undefined,
      );
      break;
    case 'position':
      store.setPosition(currentCom.value.status[configKey as 'position'], payload as number);
      break;
    case 'titleSize':
    case 'descSize':
    case 'titleWeight':
    case 'descWeight':
      store.setCurrentStatus(
        currentCom.value.status[
          configKey as 'titleSize' | 'descSize' | 'descWeight' | 'descWeight'
        ],
        payload as number,
      );
      break;
  }
};

provide('updateStatus', updateStatus);
</script>

<style scoped lang="scss">
.layout-container {
  height: 100%;
  border: 1px solid var(--border-color);
}
.aside-left {
  padding: 20px;
  border-right: 1px solid var(--border-color);
}

.aside-right {
  border-left: 1px solid var(--border-color);
  padding: 20px;
  width: 350px;
}
</style>
