<template>
  <div style="padding: 20px">
    <div v-for="(item, index) in SurveyComList" :key="index" class="mb-20">
      <SurveyComGroup :icon="item.icon" :list="item.coms" :title="item.title"></SurveyComGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import SurveyComGroup from '@/components/Editor/SurveyComGroup.vue';

import { SurveyComList } from '@/configs/SurveyGroupConfig';
</script>

<style scoped></style>
