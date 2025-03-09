import { componentMap } from '@/configs/componentMap.ts';
import type {
  ComStatus,
  EditComName,
  OptionsProps,
  OptionsStatus,
  OptionsStatusArr,
  TextProps,
  TypeStatus,
  ValueStatusArr,
} from '@/types';

export function getTextStatus(props: TextProps) {
  return props.status;
}

export function getStringStatus(props: OptionsProps) {
  if (isStringArray(props.status)) {
    return props.status;
  }
}
// 确定status为TextProps
export function isTextProps(props: unknown): props is TextProps {
  return 'status' in <TextProps>props;
}
// 判断status是optionStatus
export function isOptionStatus(status: unknown): status is OptionsStatus {
  return 'options' in <OptionsStatus>status;
}

export function isOptionProps(props: unknown): props is OptionsProps {
  return 'status' in <OptionsProps>props && 'currentStatus' in <OptionsProps>props;
}

// 确定 status 是字符串数组
export function isStringArray(status: unknown): status is string[] {
  return Array.isArray(status) && typeof status[0] === 'string';
}
// 确认 status 是Array<{label:string,vlaue:string}>数组
export function isValueStatusArr(status: OptionsStatusArr): status is ValueStatusArr {
  return Array.isArray(status) && typeof status[0] == 'object' && 'value' in status[0];
}

// 判断是否为
export function isTypeStatus(status: unknown): status is TypeStatus {
  return 'type' in (status as TypeStatus);
}

// 返回当前选中的选项
export function getCurrentStatus(props: OptionsProps) {
  return props.currentStatus;
}
// 返回currentStatus在status合集中对应的值
export function getStringStatusByCurrentStatus(props: OptionsProps) {
  if (props && isStringArray(props.status)) {
    return props.status[props.currentStatus];
  }
}

export function changeEditorIsShowStatus(status: TypeStatus, type: number) {
  if (type !== status.type.currentStatus) {
    status.title.isShow = !status.title.isShow;
    status.desc.isShow = !status.desc.isShow;
    status.position.isShow = !status.position.isShow;
    status.titleSize.isShow = !status.titleSize.isShow;
    status.descSize.isShow = !status.descSize.isShow;
    status.titleWeight.isShow = !status.titleWeight.isShow;
    status.descWeight.isShow = !status.descWeight.isShow;
    status.titleItalic.isShow = !status.titleItalic.isShow;
    status.descItalic.isShow = !status.descItalic.isShow;
    status.titleColor.isShow = !status.titleColor.isShow;
    status.descColor.isShow = !status.descColor.isShow;
  }
}

export const restoreComponentStatus = (coms: ComStatus[]) => {
  coms.forEach((com) => {
    // 业务组件的还原
    com.type = componentMap[com.name]; // 这一步就做了组件的还原
    // 接下来还原编辑组件
    for (const key in com.status) {
      const name = com.status[key].name as EditComName;
      com.status[key].editCom = componentMap[name];
    }
  });
};
