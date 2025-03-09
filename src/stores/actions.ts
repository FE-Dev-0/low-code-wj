import type { OptionsProps, StringStatusArr, TextProps, ValueStatusArr } from '@/types';
import { isStringArray, isValueStatusArr } from '@/utils';
export function setTextStatus(textProps: TextProps, text: string) {
  textProps.status = text;
}

export function setStringArrStatus(props: OptionsProps, index?: number) {
  if (index !== undefined) {
    if (props.status.length < 2) return;
    props.status.splice(index, 1);
    return;
  }
  let newItem: StringStatusArr[number] | ValueStatusArr[number] = '';
  if (isStringArray(props.status)) {
    props.status.push(newItem);
  } else if (isValueStatusArr(props.status)) {
    newItem = { label: '新选项文案', value: '新选项值' };
    props.status.push(newItem);
  }
}

export function setCurrentStatus(optionProps: OptionsProps, val: number) {
  optionProps.currentStatus = val;
}
