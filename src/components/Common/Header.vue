<template>
  <div>
    <div class="container flex self-start align-items-center border-box">
      <!-- 分为三个部分 -->
      <div class="left flex justify-content-center align-items-center">
        <el-button :icon="ArrowLeft" circle size="small" @click="goHome" />
      </div>
      <div class="center flex align-items-center space-between pl-15 pr-15">
        <div v-if="isEditor">
          <span v-if="id">
            <ElButton size="small" type="primary" @click="updateSurvey">更新问卷</ElButton>
          </span>
          <span v-else>
            <ElButton size="small" type="danger" @click="reset">重置问卷</ElButton>
            <ElButton size="small" type="success" @click="saveSurvey">保存问卷</ElButton>
          </span>
        </div>
      </div>
      <div class="right flex justify-content-center align-items-center">
        <el-avatar :size="30" :src="avatar" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import { ref } from 'vue';
import { ElButton, ElMessage, ElMessageBox } from 'element-plus';
import { useEditor } from '@/stores/useEditor';
const store = useEditor();

const props = defineProps({
  isEditor: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    default: '',
  },
});

const goHome = () => {
  router.push('/');
};

const reset = () => {
  ElMessageBox.confirm('确定要重置问卷吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store.resetComs();
      ElMessage.success('重置成功');
    })
    .catch(() => {
      ElMessage.info('已取消重置');
    });
};

const updateSurvey = () => {
  store
    .updateComs(Number(props.id), {
      updateDate: new Date().getTime(),
      surveyCount: store.surveyCount,
      coms: JSON.parse(JSON.stringify(store.coms)),
    })
    .then(() => {
      ElMessage.success('问卷已更新');
    })
    .catch(() => {
      ElMessage.error('问卷更新失败');
    });
};

const saveSurvey = () => {
  ElMessageBox.prompt('请输入问卷的标题', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
  })
    .then(({ value }) => {
      const surveyToSave = {
        createDate: new Date().getTime(),
        title: value,
        updateDate: new Date().getTime(),
        surveyCount: store.surveyCount,
        coms: JSON.parse(JSON.stringify(store.coms)),
      };
      store
        .saveComs(surveyToSave)
        .then((id) => {
          router.push(`/editor/${id}/survey-type`);
          ElMessage.success('问卷已保存');
        })
        .catch(() => {
          ElMessage.error('问卷保存失败');
        });
    })
    .catch(() => {
      ElMessage.info('已取消保存');
    });
};

const avatar = ref('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif');
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--border-color);
  .left {
    width: 60px;
    height: 100%;
  }
  .center {
    flex: 1;
    height: 100%;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  }
  .right {
    width: 80px;
    height: 100%;
  }
}
</style>
