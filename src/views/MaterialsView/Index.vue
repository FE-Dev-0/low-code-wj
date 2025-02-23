<template>
  <Header></Header>
  <ElContainer class="container">
    <ElAside width="70px" style="padding: 0">
      <div class="category" accordion @change="handleCategoryChange">
        <RouterLink class="category-item" to="/select-group">
          <ElIcon>
            <CircleCheck />
          </ElIcon>
          <span> 选择题 </span>
        </RouterLink>
        <RouterLink class="category-item" to="/input-group">文本输入</RouterLink>
        <RouterLink class="category-item" to="/advanced-group">高级题型</RouterLink>
        <RouterLink class="category-item" to="note-group">备注说明</RouterLink>
        <RouterLink class="category-item" to="personal-group">个人信息</RouterLink>
      </div>
    </ElAside>
    <!-- 路由出口 -->
    <div class="coms">
      <RouterView />
    </div>
  </ElContainer>
</template>

<script setup lang="ts">
import Header from '@/components/Common/Header.vue';
import { CircleCheck } from '@element-plus/icons-vue';
import { ElAside, ElContainer, ElIcon } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();
const handleCategoryChange = (path: unknown) => {
  router.push(path as string);
};
</script>

<style scoped lang="scss">
.container {
  width: 80%;
  padding: 15px;
  height: calc(100vh - 50px);
  margin: 0 auto;
}
.category {
  width: 70px;
  height: 100%;
  > .category-item {
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    text-align: center;
    text-decoration: none;
    font-size: var(--font-size-base);
    color: var(--white);
    border-top-left-radius: var(--border-radius-lg);
    border-bottom-left-radius: var(--border-radius-lg);
  }
  @for $i from 1 through 4 {
    .category-item:nth-child(4n + #{$i}) {
      @if $i == 1 {
        background-color: var(--primary-color);
      } @else if $i == 2 {
        background-color: var(--success-color);
      } @else if $i == 3 {
        background-color: var(--warning-color);
      } @else if $i == 4 {
        background-color: var(--error-color);
      }
    }
  }
}

.coms {
  width: calc(100% - 70px);
  height: 100%;
}
</style>
