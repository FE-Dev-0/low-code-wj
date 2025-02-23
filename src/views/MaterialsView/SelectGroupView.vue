<template>
  <Layout>
    <RouterLink to="/single-select">
      <ElButton text bg tag="a">单选题</ElButton>
    </RouterLink>
  </Layout>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import Layout from './Layout.vue';
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>
