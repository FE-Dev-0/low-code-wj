<template>
  <div class="center-container" ref="centerContainer">
    <draggable v-model="store.coms" item-key="index" @start="dragstart">
      <template #item="{ element, index }">
        <div
          :key="element.id"
          @click="clickHandle(index)"
          class="content relative mb-10"
          :class="{
            active: store.currentComIndex === index,
          }"
          :ref="(el) => (componentsRefs[index] = el)"
        >
          <component :is="element.type" :status="element.status"></component>
          <!-- 删除按钮 -->
          <div class="absolute delete-btn" v-show="store.currentComIndex === index">
            <ElButton
              type="danger"
              class="ml-10"
              size="small"
              :icon="Close"
              circle
              @click.stop="removeCom(index)"
            />
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';
import { ElButton, ElMessage, ElMessageBox } from 'element-plus';
import draggable from 'vuedraggable';
import { useEditor } from '@/stores/useEditor';
import { nextTick, ref, type ComponentPublicInstance } from 'vue';
import eventBus from '@/utils/eventBus';
const store = useEditor();

const clickHandle = (index: number) => {
  if (store.currentComIndex === index) {
    store.setCurrentComponentIndex(-1);
  } else {
    store.setCurrentComponentIndex(index);
  }
};

// 删除选中的组件
const removeCom = (index: number) => {
  ElMessageBox.confirm('确定删除该组件吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store.removeCom(index);
      store.setCurrentComponentIndex(-1);
      ElMessage.success('删除成功');
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
};
// 开始拖动
const dragstart = () => {
  store.setCurrentComponentIndex(-1);
};

const centerContainer = ref<HTMLElement | null>(null);

// 滚到底部
const scorllToBottom = () => {
  nextTick(() => {
    const container = centerContainer.value; // 获取容器的dom元素
    if (container) {
      const contentHeight = container.scrollHeight;
      if (!container.parentElement) return;
      container.parentElement.scrollTop = contentHeight;
    }
  });
};

const componentsRefs = ref<(Element | ComponentPublicInstance | null)[]>([]);
// 将某个题目滚动到视口中间
const scrollToCenter = (index: number) => {
  nextTick(() => {
    const element = componentsRefs.value[index]; // 获取当前题目的dom元素
    // 判断当前元素是否是HTMLElement
    if (element instanceof HTMLElement) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  });
};

eventBus.on('scrollToBottom', scorllToBottom);
eventBus.on('scrollToCenter', scrollToCenter);
</script>

<style scoped lang="scss">
.center-container {
  .content {
    padding: 10px;
    background-color: var(--white);
    &:hover {
      transform: scale(1.01);
      transition: 0.5s;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
  .active {
    transform: scale(1.01);
    border-radius: var(--border-radius-base);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .delete-btn {
    right: -5px;
    top: -10px;
  }
}
</style>
