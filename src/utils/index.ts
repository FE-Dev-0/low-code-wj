import type { OptionsProps, OptionsStatusArr, TextProps } from '@/types';

export function getTextStatus(props: TextProps) {
  return props.status;
}

export function getStringStatus(props: OptionsProps) {
  if (isStringArray(props.status)) {
    return props.status;
  }
}

// 确定 status 是字符串数组
export function isStringArray(status: OptionsStatusArr): status is string[] {
  return Array.isArray(status) && typeof status[0] === 'string';
}
// 确认 status 是Array<{label:string,vlaue:string}>数组
export function isValueStatusArr(status: OptionsStatusArr) {
  return Array.isArray(status) && typeof status[0] == 'object' && 'value' in status[0];
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
