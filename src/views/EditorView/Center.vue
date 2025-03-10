<template>
  <div class="center-container">
    <draggable v-model="store.coms" item-key="index" @start="dragstart">
      <template #item="{ element, index }">
        <div
          :key="element.id"
          @click="clickHandle(index)"
          class="content relative mb-10"
          :class="{
            active: store.currentComIndex === index,
          }"
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
</script>

<style scoped lang="scss">
.center-container {
  border: 1px solid var(--border-color);
  height: 100%;
  box-sizing: border-box;
  border-radius: var(--border-radius-base);
  padding: 20px;
  background-color: var(--white);
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
