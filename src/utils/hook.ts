import { isSurveyComName, type ComStatus } from '@/types';
import { computed } from 'vue';

export function useSurveyNo(coms: ComStatus[]) {
  return computed(() => {
    let questionNumber = 1;
    return coms.map((com) => {
      // 需要判断当前这个组件是不是问卷题目
      if (isSurveyComName(com.name)) {
        return questionNumber++;
      }
      return null;
    });
  });
}
