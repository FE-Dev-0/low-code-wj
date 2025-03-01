import type { OptionItemType, OptionsProps, TextProps } from '@/types';
import { isStringArray, isValueStatusArr } from '@/utils';
export function setTextStatus(textProps: TextProps, text: string) {
  textProps.status = text;
}

export function setStringArrStatus(optionProps: OptionsProps, index?: number) {
  if (index !== undefined) {
    if (optionProps.status.length < 2) return;
    optionProps.status.splice(index, 1);
    return;
  }
  let newItem: OptionItemType = '';
  if (isStringArray(optionProps.status)) {
    newItem = '新选项';
  } else if (isValueStatusArr(optionProps.status)) {
    newItem = { label: '新选项文案', value: '新选项值' };
  }
  optionProps.status.push(newItem);
}

export function setPosition(optionProps: OptionsProps, val: number) {
  optionProps.currentStatus = val;
}

export function setCurrentStatus(optionProps: OptionsProps, val: number) {
  optionProps.currentStatus = val;
}
