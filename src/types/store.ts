import type { OptionsProps, TextProps } from './editProps';
import type { ComStatus } from './common';
// 题目类型
export type SurveyComName =
  | 'single-select'
  | 'single-pic-select'
  | 'personal-info-gender'
  | 'personal-info-education';

// 业务组件类型(题目类型 + 非题目类型)
export type Material = SurveyComName | 'text-note';

export interface Actions {
  setTextStatus: (textProps: TextProps, text: string) => void;
  setStringArrStatus: (optionProps: OptionsProps, index?: number) => void;
  setPosition: (optionProps: OptionsProps, index: number) => void;
  setCurrentStatus: (optionProps: OptionsProps, index: number) => void;
}

export interface MaterialStore extends Actions {
  currentMaterialCom: Material;
  coms: Record<Material, ComStatus>;
}
