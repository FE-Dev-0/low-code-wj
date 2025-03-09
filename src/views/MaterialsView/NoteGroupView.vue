<template>
  <Layout>
    <RouterLink to="/text-note">
      <ElButton text bg tag="a">备注说明</ElButton>
    </RouterLink>
  </Layout>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import Layout from './Layout.vue';
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>
