<template>
  <div class="pt-20 pb-20 pl-20 pr-20">
    <h1 class="font-weight-100 text-center">渡一问卷系统</h1>
    <!-- 按钮组 -->
    <div class="mb-15">
      <el-button type="primary" :icon="Plus" @click="goToEditor">创建问卷</el-button>
      <el-button type="success" :icon="Compass" @click="goToComMarket">组件市场</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column fixed prop="createDate" label="创建日期" width="150" />
      <el-table-column prop="title" label="问卷标题" />
      <el-table-column prop="surveyCount" label="题目数" width="150" align="center" />
      <el-table-column prop="updateDate" label="最近更新日期" width="150" align="center" />
      <el-table-column fixed="right" label="操作" width="300" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="viweSurvery(scope.row)">
            查看问卷
          </el-button>
          <el-button link type="primary" size="small" @click="editSurvey(scope.row)">
            编辑
          </el-button>
          <ElPopconfirm title="确认删除问卷?" @confirm="destorySurvey(scope.row)">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </ElPopconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Plus, Compass } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { deleteSurveyById, getAllSurvey } from '@/db/operation';
// 路由
import { useRouter } from 'vue-router';
import type { SurveyDBData, SurveyDBReturnData } from '@/types';
import { ElPopconfirm } from 'element-plus';
const router = useRouter();

const tableData = ref<SurveyDBData[]>([]);

const goToEditor = () => {
  localStorage.setItem('activeView', 'editor');
  router.push('/editor/survey-type');
};

const goToComMarket = () => {
  localStorage.setItem('activeView', 'materials');
  router.push('/materials');
};

// 获取全部的问卷
function getData() {
  getAllSurvey().then((res) => {
    tableData.value = res;
  });
}

getData();

// 查看问卷
function viweSurvery(surveyInfo: SurveyDBReturnData) {
  router.push({
    path: `/preview/${surveyInfo.id}`,
    state: {
      from: 'home',
    },
  });
}

// 删除问卷
function destorySurvey(surveyInfo: SurveyDBReturnData) {
  deleteSurveyById(surveyInfo.id).then(() => {
    getData();
  });
}

// 编辑问卷
function editSurvey(surveyInfo: SurveyDBReturnData) {
  // 仅仅是做一个跳转，跳转到编辑器页面，但是需要将 id 带过去
  router.push(`/editor/${surveyInfo.id}/survey-type`);
}
</script>
