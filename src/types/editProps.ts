import type { VueComType } from './common';

export interface BaseProps {
  id: string;
  isShow: boolean;
  name: string;
  editCom: VueComType;
}

// 文本编辑组件的Props类型定义
export interface TextProps extends BaseProps {
  status: string;
}

export type StringStatusArr = string[];
export type ValueStatusArr = Array<{ value: string; label: string }>;

export interface OptionsProps extends BaseProps {
  status: StringStatusArr | ValueStatusArr;
  currentStatus: number;
}

// 业务组件公共的PropsType
export interface BaseStatus {
  title: TextProps;
  desc: TextProps;
  position: OptionsProps;
  titleSize: OptionsProps;
  descSize: OptionsProps;
  titleWeight: OptionsProps;
  descWeight: OptionsProps;
  titleItalic: OptionsProps;
  descItalic: OptionsProps;
  titleColor: TextProps;
  descColor: TextProps;
}

// 因为不是所有业务组件都有options这个选项、所以需要分开定义
export interface OptionsStatus extends BaseStatus {
  options: OptionsProps;
}

export type UpdateStatus = (configKey: string, payload?: number | string | boolean) => void;
