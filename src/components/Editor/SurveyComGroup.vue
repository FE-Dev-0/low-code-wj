<template>
  <div>
    <div class="group-title font-weight-500 mb-15 flex align-items-center">
      <ElIcon :size="20">
        <component :is="icon"></component>
      </ElIcon>
      <span class="ml-5">{{ title }}</span>
    </div>
    <div v-for="(com, index) in list" :key="index">
      <SurveyComItem :com-name="com?.comName" :material-name="com?.materialName"></SurveyComItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus';
import SurveyComItem from './SurveyComItem.vue';

defineProps(['title', 'icon', 'list']);
</script>

<style lang="scss" scoped>
.group-title {
}
</style>
