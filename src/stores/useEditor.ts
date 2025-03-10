import { defineStore } from 'pinia';
import { getParagraphDefaultStatus, getTitleDefaultStatus } from '@/configs/defaultStatus/textNote';
import { isSurveyComName, type ComStatus, type SurveyDBData } from '@/types';
import { setCurrentStatus, setStringArrStatus, setTextStatus } from './actions';
import { saveSurvey, updateSurveyById } from '@/db/operation';

const initSotre = () => {
  return [Object.assign({}, getTitleDefaultStatus()), getParagraphDefaultStatus()];
};

export const useEditor = defineStore('editorStore', {
  state: () => ({
    // 当前选中在数组中的索引
    currentComIndex: -1,
    // 题目谁
    surveyCount: 0,
    // 记录所有的业务组件
    coms: initSotre() as unknown as ComStatus[],
  }),
  actions: {
    setTextStatus,
    setStringArrStatus,
    setCurrentStatus,
    // 添加题目
    addCom(newCom: ComStatus) {
      this.coms.push(newCom);
      if (isSurveyComName(newCom.name)) {
        this.surveyCount++;
      }
      this.currentComIndex = -1;
    },
    // 选择某个题目
    setCurrentComponentIndex(index = -1) {
      this.currentComIndex = index;
    },
    // 重置问卷
    resetComs() {
      this.coms = initSotre() as unknown as ComStatus[];
    },
    // 还原问卷
    setStore(data: SurveyDBData) {
      this.coms = data.coms;
      this.surveyCount = data.surveyCount;
      this.currentComIndex = -1;
    },
    // 更新问卷
    updateComs(id: number, data: Partial<SurveyDBData>) {
      return updateSurveyById(id, data);
    },
    // 保存问卷数据
    saveComs(data: SurveyDBData) {
      return saveSurvey(data);
    },
    // 删除
    removeCom(index: number) {
      // 删除的时候要看删除的是不是问卷题目
      if (isSurveyComName(this.coms[index].name)) {
        this.surveyCount--;
      }
      this.coms.splice(index, 1);
    },
  },
});
