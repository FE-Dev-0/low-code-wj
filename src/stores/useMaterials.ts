import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap';
import { defineStore } from 'pinia';
import { setTextStatus } from './actions';
export const useMaterialStore = defineStore('materilaStore', {
  state: () => ({
    // 当前选择的组件
    currentMaterialCom: 'single-select',
    // 记录所有的业务组件
    coms: {
      'single-select': defaultStatusMap['single-select'](),
    },
  }),
  actions: {
    setTextStatus,
  },
});
