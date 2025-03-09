<template>
  <div class="right-side-contianer">
    <div v-if="store.currentComIndex === -1">
      <ElEmpty description="点击题型进行编辑"></ElEmpty>
    </div>
    <div v-else>
      <EditPannel :com="currentCom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EditPannel from '@/components/SurveyComs/EditItems/EditPannel.vue';
import { useEditor } from '@/stores/useEditor';
import { ElEmpty } from 'element-plus';
import { computed } from 'vue';

const store = useEditor();

const currentCom = computed(() => {
  return store.coms[store.currentComIndex];
});
</script>

<style scoped lang="scss">
.right-side-contianer {
  height: calc(100% - 40px - 2px);
  padding: 20px;
  background-color: var(--white);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
}
</style>
