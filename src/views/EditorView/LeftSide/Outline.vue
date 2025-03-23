<template>
  <div v-if="store.surveyCount">
    <draggable v-model="store.coms" item-key="index" @start="dragstart">
      <template #item="{ element, index }">
        <div class="mb-10" v-show="isSurveyComName(element.name)" @click="clickHandle(index)">
          <div
            class="item"
            :class="{
              active: store.currentComIndex === index,
            }"
          >
            {{ serialNums[index] }}
            {{
              element.status.title.status.length > 15
                ? element.status.title.status.substring(0, 15) + '...'
                : element.status.title.status
            }}
          </div>
        </div>
      </template>
    </draggable>
  </div>
  <div v-else>请添加题目</div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { useEditor } from '@/stores/useEditor';
import { isSurveyComName } from '@/types';
import { computed } from 'vue';
import EventBus from '@/utils/eventBus';
const store = useEditor();

const serialNums = computed(() => {
  return store.coms.map((el, index) => {
    return isSurveyComName(el.name) ? index : null;
  });
});

function dragstart() {
  store.setCurrentComponentIndex(-1);
}

function clickHandle(index: number) {
  if (store.currentComIndex === index) {
    store.setCurrentComponentIndex(-1);
  } else {
    store.setCurrentComponentIndex(index);
    EventBus.emit('scrollToCenter', index);
  }
}
</script>

<style scoped>
.item {
  /* outline: 1px solid black; */
  color: var(--font-color-light);
  font-size: var(--font-size-base);
  padding: 10px;
  cursor: pointer;
}
.active {
  transform: scale(1.04);
  transition: 0.5s;
  background-color: var(--border-color);
  border-radius: var(--border-radius-lg);
}
</style>
