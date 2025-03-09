<template>
  <div class="left-side-container flex">
    <div class="tabs">
      <div
        class="tab-item"
        :class="{ active: routeName === 'survey-type' }"
        @click="switchEditor()"
      >
        <ElIcon><Tickets /></ElIcon>
        <span class="tab-item-title mt-5">题目</span>
      </div>
      <div class="tab-item" :class="{ active: routeName === 'outline' }" @click="switchOutline()">
        <ElIcon><Document /></ElIcon>
        <span>大纲</span>
      </div>
    </div>
    <div class="tab-pane">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { Tickets, Document } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
const router = useRouter();
const route = useRoute();
const routeName = computed(() => route.name);

const switchEditor = () => {
  router.push({ name: 'survey-type' });
};
const switchOutline = () => {
  router.push({ name: 'outline' });
};
</script>

<style scoped lang="scss">
.left-side-container {
  height: calc(100% - 2px);
  border: 1px solid var(--border-color);
  overflow-y: scroll;
  border-radius: var(--border-radius-md);
  background-color: var(--white);
  > .tabs {
    display: flex;
    flex-direction: column;
    width: 70px;
    border-right: 1px solid var(--border-color);
    > .tab-item {
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      > .tab-item-title {
        font-size: var(--font-size-base);
      }
      &.active {
        color: var(--primary-color);
      }
    }
  }
  > .tab-pane {
    padding: 10px;
  }
}
</style>
